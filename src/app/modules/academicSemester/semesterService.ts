import ApiError from '../../../ApiError'
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
