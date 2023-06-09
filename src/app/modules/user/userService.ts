import config from '../../../config'
import { calculation } from '../../../helper/paginationHelper'
import { IPagination } from '../../../interfaces/queryInterfaces'
import { IUser } from './userInterface'
import User from './userModel'
import { generateUserId } from './userUtils'

export const createUserService = async (user: IUser): Promise<IUser | null> => {
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

type IGenericResponse<T> = {
  meta: {
    page: number
    limit: number
    total: number
  }
  data: T
}

export const getAllUserService = async (paginationOption: IPagination): Promise<IGenericResponse<IUser[]>> => {
  const { page, limit, skip, sortCondition } = calculation(paginationOption)


  const data = await User.find().limit(limit).skip(skip).sort(sortCondition)
  const total = await User.countDocuments()
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
