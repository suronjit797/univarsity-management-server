import httpStatus from 'http-status'
import ApiError from '../../../ApiError'
import { calculation } from '../../../helper/paginationHelper'
import { IPagination } from '../../../interfaces/queryInterfaces'
import { ISearchingAndFiltering } from '../../../interfaces/searchingAndFiltering'
import StudentModel from './studentModel'
import { IStudent } from './studentInterface'


export const getAllStudentService = async (filter: ISearchingAndFiltering, paginationOption: IPagination) => {
  const { limit, page, skip, sortCondition } = calculation(paginationOption)
  const data = await StudentModel.find(filter)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
    .limit(limit)
    .skip(skip)
    .sort(sortCondition)
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


export const getSingleStudentService = async (id: string): Promise<IStudent | null> => {
  const data = await StudentModel.findById(id)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
  return data
}

export const updateSingleStudentService = async (id: string, payload: Partial<IStudent>): Promise<IStudent | null> => {
  const isExistStudent = await StudentModel.findById(id)
  if (!isExistStudent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found')
  }
  const { name, guardian, localGuardian } = payload

  const updaterStudent = isExistStudent 

  if (name && Object.keys(name).length > 0) {
    updaterStudent.name = { ...isExistStudent.name, ...name }
  }
  if (guardian && Object.keys(guardian).length > 0) {
    updaterStudent.guardian = { ...isExistStudent.guardian, ...guardian }
  }
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    updaterStudent.localGuardian = { ...isExistStudent.localGuardian, ...localGuardian }
  }

  const data = await StudentModel.findByIdAndUpdate(id, updaterStudent, { new: true })
  return data
}

export const deleteSingleStudentService = async (id: string) => {
  const data = await StudentModel.findByIdAndDelete(id)
  return data
}
