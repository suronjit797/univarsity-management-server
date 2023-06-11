import ApiError from '../../../ApiError'
import { calculation } from '../../../helper/paginationHelper'
import { IPagination } from '../../../interfaces/queryInterfaces'
import { ISearchingAndFiltering } from '../../../interfaces/searchingAndFiltering'
import { IFaculty } from './facultyInterface'
import AcademicFaculty from './facultyModel'
import httpStatus from 'http-status'

export const createFaculty = async (data: IFaculty): Promise<IFaculty> => {
  const result = await AcademicFaculty.create(data)
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Faculty create failed')
  }
  return result
}

// get all Faculty
export const getAllFacultyService = async (filter: ISearchingAndFiltering, paginationOption: IPagination) => {
  const { limit, page, skip, sortCondition } = calculation(paginationOption)

  const data = await AcademicFaculty.find(filter).limit(limit).skip(skip).sort(sortCondition)
  const total = await AcademicFaculty.countDocuments(filter)

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
  const data = await AcademicFaculty.findById(id)
  return data
}

export const updateSingleFacultyService = async (id: string, payload: Partial<IFaculty>): Promise<IFaculty | null> => {
  const data = await AcademicFaculty.findByIdAndUpdate(id, payload, { new: true })
  return data
}

export const deleteSingleFacultyService = async (id: string) => {
  const data = await AcademicFaculty.findByIdAndDelete(id)
  return data
}
