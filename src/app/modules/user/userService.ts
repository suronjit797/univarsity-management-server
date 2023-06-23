import { calculation } from '../../../helper/paginationHelper'
import { IPagination } from '../../../interfaces/queryInterfaces'
import { IGenericResponse } from '../../../interfaces/responseInterface'
import { ISearchingAndFiltering } from '../../../interfaces/searchingAndFiltering'
import { IUser } from './userInterface'
import User from './userModel'



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
