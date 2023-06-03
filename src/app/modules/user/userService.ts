import config from '../../../config'
import { IUser } from './userInterface'
import User from './userShcema'
import { generateUserId } from './userUtils'

export const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated userId
  const lastAddedStudent = await User.findOne().sort({ createdAt: -1 }).exec()
  let lastNumber = 0
  if (lastAddedStudent?.uid) {
    lastNumber = Number(lastAddedStudent.uid.slice(-5))
  }

  user.uid = generateUserId(lastNumber)
  // default password
  if (!user.password) {
    user.password = config.DEFAULT_USER_PASS as string
  }

  const newUser = await User.create(user)
  return newUser
}
