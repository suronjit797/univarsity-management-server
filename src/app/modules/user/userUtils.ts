import { ISemester } from '../academicSemester/semesterInterface'
import User from './userModel'

export const generateStudentId = async (semester: ISemester | null): Promise<string | null> => {
  // auto generated userId
  if (!semester) {
    return null
  }

  const lastAddedStudent = await User.findOne({ role: 'student' }).sort({ createdAt: -1 }).lean()

  let lastStudentId = 0
  if (
    lastAddedStudent?.uid &&
    lastAddedStudent?.uid.slice(0, 2) === semester?.year.toString().slice(-2) &&
    lastAddedStudent?.uid.slice(2, 4) === semester?.code
  ) {
    lastStudentId = Number(lastAddedStudent.uid.slice(-5))
  }

  const newId = lastStudentId + 1
  const uid = newId.toString().padStart(5, '0')
  return `${semester.year.toString().slice(-2)}${semester.code}${uid}`
}

export const generateFacultyId = async (): Promise<string> => {
  // auto generated userId
  const lastAddedFaculty = await User.findOne({ role: 'faculty' }).sort({ createdAt: -1 }).lean()

  let lastFacultyId = 0
  if (lastAddedFaculty?.uid) {
    lastFacultyId = Number(lastAddedFaculty.uid.slice(-5))
  }
  const newId = lastFacultyId + 1
  const uid = newId.toString().padStart(5, '0')
  return `F-${uid}`
}
