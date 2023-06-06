import { ISemester } from './semesterInterface'
import AcademicSemester from './semesterModel'

export const createSemester = async (data: ISemester) => {
  const result = await AcademicSemester.create(data)
  if (!result) {
    throw new Error('Semester create failed')
  }
  return result
}
