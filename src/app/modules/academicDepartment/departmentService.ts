import ApiError from '../../../ApiError'
import { calculation } from '../../../helper/paginationHelper'
import { IPagination } from '../../../interfaces/queryInterfaces'
import { ISearchingAndFiltering } from '../../../interfaces/searchingAndFiltering'
import { IDepartment } from './departmentInterface'
import AcademicDepartment from './departmentModel'
import httpStatus from 'http-status'

export const createDepartment = async (data: IDepartment): Promise<IDepartment> => {
  const result = await AcademicDepartment.create(data)
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Department create failed')
  }
  return result
}

// get all Department
export const getAllDepartmentService = async (filter: ISearchingAndFiltering, paginationOption: IPagination) => {
  const { limit, page, skip, sortCondition } = calculation(paginationOption)

  const data = await AcademicDepartment.find(filter).limit(limit).skip(skip).sort(sortCondition)
  const total = await AcademicDepartment.countDocuments(filter)

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

export const getSingleDepartmentService = async (id: string): Promise<IDepartment | null> => {
  const data = await AcademicDepartment.findById(id)
  return data
}

export const updateSingleDepartmentService = async (
  id: string,
  payload: Partial<IDepartment>
): Promise<IDepartment | null> => {
  const data = await AcademicDepartment.findByIdAndUpdate(id, payload, { new: true })
  return data
}

export const deleteSingleDepartmentService = async (id: string) => {
  const data = await AcademicDepartment.findByIdAndDelete(id)
  return data
}
