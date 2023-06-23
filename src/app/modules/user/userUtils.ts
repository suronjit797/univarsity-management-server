
import User from './userModel'


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
