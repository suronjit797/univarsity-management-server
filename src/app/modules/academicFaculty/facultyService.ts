import ApiError from '../../../ApiError'
import { calculation } from '../../../helper/paginationHelper'
import { IPagination } from '../../../interfaces/queryInterfaces'
import { ISearchingAndFiltering } from '../../../interfaces/searchingAndFiltering'
import { IFaculty } from './facultyInterface'
import AcademicFacultyModel from './facultyModel'
import httpStatus from 'http-status'

export const createFaculty = async (data: IFaculty): Promise<IFaculty> => {
  const result = await AcademicFacultyModel.create(data)
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Faculty create failed')
  }
  return result
}

// get all Faculty
export const getAllFacultyService = async (filter: ISearchingAndFiltering, paginationOption: IPagination) => {
  const { limit, page, skip, sortCondition } = calculation(paginationOption)

  const data = await AcademicFacultyModel.find(filter).limit(limit).skip(skip).sort(sortCondition)
  const total = await AcademicFacultyModel.countDocuments(filter)

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

export const getSingleFacultyService = async (id: string): Promise<IFaculty | null> => {
  const data = await AcademicFacultyModel.findById(id)
  return data
}

export const updateSingleFacultyService = async (id: string, payload: Partial<IFaculty>): Promise<IFaculty | null> => {
  const data = await AcademicFacultyModel.findByIdAndUpdate(id, payload, { new: true })
  return data
}

export const deleteSingleFacultyService = async (id: string) => {
  const data = await AcademicFacultyModel.findByIdAndDelete(id)
  return data
}
