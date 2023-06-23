import { calculation } from '../../../helper/paginationHelper'
import { IPagination } from '../../../interfaces/queryInterfaces'
import { ISearchingAndFiltering } from '../../../interfaces/searchingAndFiltering'
import StudentModel from './studentModel'

export const getAllStudentService = async (filter: ISearchingAndFiltering, paginationOption: IPagination) => {
  const { limit, page, skip, sortCondition } = calculation(paginationOption)
  const data = await StudentModel.find(filter).limit(limit).skip(skip).sort(sortCondition)
  const total = await StudentModel.countDocuments(filter)

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
