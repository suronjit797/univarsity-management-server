import mongoose from 'mongoose'
import config from '../../../config'
import { calculation } from '../../../helper/paginationHelper'
import { IPagination } from '../../../interfaces/queryInterfaces'
import { IGenericResponse } from '../../../interfaces/responseInterface'
import { ISearchingAndFiltering } from '../../../interfaces/searchingAndFiltering'
import AcademicSemesterModel from '../academicSemester/semesterModel'
import { IStudent } from '../student/studentInterface'
import { IUser } from './userInterface'
import User from './userModel'
import { generateStudentId } from './userUtils'
import StudentModel from '../student/studentModel'
import ApiError from '../../../ApiError'
import httpStatus from 'http-status'

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
