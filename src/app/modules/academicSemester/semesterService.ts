import ApiError from '../../../ApiError'
import { calculation } from '../../../helper/paginationHelper'
import { IPagination } from '../../../interfaces/queryInterfaces'
import { ISearchingAndFiltering } from '../../../interfaces/searchingAndFiltering'
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

// get all semesters
export const getAllSemesterService = async (filter: ISearchingAndFiltering, paginationOption: IPagination) => {
  const { limit, page, skip, sortCondition } = calculation(paginationOption)

  const data = await AcademicSemester.find(filter).limit(limit).skip(skip).sort(sortCondition)
  const total = await AcademicSemester.countDocuments(filter)

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

export const getSingleSemesterService = async (id: string): Promise<ISemester | null> => {
  const data = await AcademicSemester.findById(id)
  return data
}

export const updateSingleSemesterService = async (
  id: string,
  payload: Partial<ISemester>
): Promise<ISemester | null> => {
  if (payload.title && payload.code && academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid code')
  }
  const data = await AcademicSemester.findByIdAndUpdate(id, payload, { new: true })
  return data
}
