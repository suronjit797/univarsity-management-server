import config from '../../../config'
import { calculation } from '../../../helper/paginationHelper'
import { IPagination } from '../../../interfaces/queryInterfaces'
import { IGenericResponse } from '../../../interfaces/responseInterface'
import { ISearchingAndFiltering } from '../../../interfaces/searchingAndFiltering'
import { IUser } from './userInterface'
import User from './userModel'
import { generateFacultyId, generateStudentId } from './userUtils'

export const createUserService = async (user: IUser): Promise<IUser | null> => {
  if (user.role === 'student') {
    user.uid = await generateStudentId({ code: '01', year: 2027 })
  }
  if(user.role === 'faculty'){
    user.uid = await generateFacultyId()
  }
  // default password
  if (!user.password) {
    user.password = config.DEFAULT_USER_PASS as string
  }

  const newUser = await User.create(user)
  return newUser
}

export const getAllUserService = async (
  filter: ISearchingAndFiltering,
  paginationOption: IPagination
): Promise<IGenericResponse<IUser[]>> => {
  const { page, limit, skip, sortCondition } = calculation(paginationOption)

  const data = await User.find(filter).limit(limit).skip(skip).sort(sortCondition)
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
