import httpStatus from 'http-status'
import ApiError from '../../../ApiError'
import { calculation } from '../../../helper/paginationHelper'
import { IPagination } from '../../../interfaces/queryInterfaces'
import { ISearchingAndFiltering } from '../../../interfaces/searchingAndFiltering'
import StudentModel from './studentModel'
import config from '../../../config'
import { IStudent } from './studentInterface'
import { IUser } from '../user/userInterface'
import mongoose from 'mongoose'
import { generateStudentId } from './studentsUtils'
import User from '../user/userModel'
import AcademicSemesterModel from '../academicSemester/semesterModel'

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

export const createStudentService = async (student: IStudent, user: IUser): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.DEFAULT_STUDENT_PASS as string
  }
  const academicSemester = await AcademicSemesterModel.findById(student.academicSemester)

  let newUserAllData
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    // generate student id
    const uid = await generateStudentId(academicSemester)
    if (uid) {
      user.uid = uid
      student.uid = uid
    }
    const createdStudent = await StudentModel.create([student], { session })
    if (createdStudent.length <= 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }
    user.student = createdStudent[0]._id

    const newUser = await User.create([user], { session })

    if (newUser.length <= 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    newUserAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  if (newUserAllData) {
    newUserAllData = await User.findById(newUserAllData._id).populate({
      path: 'student',
      populate: [{ path: 'academicSemester' }, { path: 'academicDepartment' }, { path: 'academicFaculty' }],
    })
  }

  return newUserAllData
}

export const getSingleStudentService = async (id: string): Promise<IStudent | null> => {
  const data = await StudentModel.findById(id)
  return data
}

export const updateSingleStudentService = async (id: string, payload: Partial<IStudent>): Promise<IStudent | null> => {
  const data = await StudentModel.findByIdAndUpdate(id, payload, { new: true })
  return data
}

export const deleteSingleStudentService = async (id: string) => {
  const data = await StudentModel.findByIdAndDelete(id)
  return data
}
