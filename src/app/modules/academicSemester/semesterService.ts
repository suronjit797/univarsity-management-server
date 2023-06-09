import ApiError from '../../../ApiError'
import { calculation } from '../../../helper/paginationHelper'
import { IPagination } from '../../../interfaces/queryInterfaces'
import { academicSemesterTitleCodeMapper } from './semesterConstant'
import { ISemester } from './semesterInterface'
import AcademicSemester from './semesterModel'
import httpStatus from 'http-status'

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

export const getAllSemester = async (paginationOption: IPagination) => {
  const {limit, page, skip, sortCondition} = calculation(paginationOption)

  const data = await AcademicSemester.find().limit(limit).skip(skip).sort(sortCondition)
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