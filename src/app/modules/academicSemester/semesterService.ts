import ApiError from '../../../ApiError'
import { calculation } from '../../../helper/paginationHelper'
import { IPagination } from '../../../interfaces/queryInterfaces'
import { academicSemesterTitleCodeMapper } from './semesterConstant'
import { ISemester } from './semesterInterface'
import AcademicSemester from './semesterModel'
import httpStatus from 'http-status'

//   const keys = Object.keys(AcademicSemester.schema.obj)

export const createSemester = async (data: ISemester): Promise<ISemester> => {
  if (academicSemesterTitleCodeMapper[data.title] !== data.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid code')
  }

  const result = await AcademicSemester.create(data)
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Semester create failed')
  }
  return result
}

type IFilter = {
  searchTerm?: string | number
}

// get all semesters
export const getAllSemesterService = async (filter: IFilter, paginationOption: IPagination) => {
  const { limit, page, skip, sortCondition } = calculation(paginationOption)
  const { searchTerm, ...filterData } = filter

  const partialSearchableFields = ['title', 'code']
  const andCondition = []

  if (searchTerm) {
    andCondition.push({
      $or: partialSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm as string,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      $and: Object.entries(filterData).map(([key, value]) => ({ [key]: value })),
    })
  }

  const where: { [key: string]: object } = {}

  if (andCondition.length > 0) {
    where.$and = andCondition
  }


  const data = await AcademicSemester.find(where).limit(limit).skip(skip).sort(sortCondition)
  const total = await AcademicSemester.countDocuments()

  // return data
  return {
    meta: {
      page,
      limit,
      total,
    },
    data,
  }
}
