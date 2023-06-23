import { RequestHandler } from 'express'
import { TPayload } from '../../../interfaces/responseInterface'
import { IStudent } from './studentInterface'
import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import * as studentService from './studentService'
import { ISearchingAndFiltering } from '../../../interfaces/searchingAndFiltering'
import StudentModel from './studentModel'
import pic from '../../../shared/pick'
import { paginationOptionArr } from '../../../constants/pagination'
import { searchingAndFiltering } from '../../../helper/searchingHelper'
import { IUser } from '../user/userInterface'

export const getAllStudents: RequestHandler = async (req, res, next) => {
  try {
    const partialSearchableFields = [
      'dateOfBirth',
      'email',
      'name.firstName',
      'name.lastName',
      'name.middleName',
      'contactNo',
      'uid',
      'emergencyContactNo',
      'presentAddress',
      'permanentAddress',
    ]
    // get searching and filtering data
    const filter: ISearchingAndFiltering = searchingAndFiltering(req, new StudentModel(), partialSearchableFields)

    // console.log(filter.$and[0].$or)

    // get pagination data
    const paginationOption = pic(req.query, paginationOptionArr)
    const student = await studentService.getAllStudentService(filter, paginationOption)
    const payload: TPayload<IStudent[]> = {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student retrieve successfully',
      meta: student.meta,
      data: student.data,
    }
    sendResponse(res, payload)
  } catch (error) {
    next(error)
  }
}

export const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { student, ...userData } = req.body
    userData.role = 'student'
    const data = await studentService.createStudentService(student, userData)

    if (!data) {
      next('Student Create Failed')
    }
    const payload: TPayload<IUser | null> = {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student created successfully',
      data,
    }
    sendResponse(res, payload)
  } catch (error) {
    next(error)
  }
}

export const getSingleSemester: RequestHandler = async (req, res, next) => {
  try {
    const { semesterId } = req.params
    const semester = await studentService.getSingleStudentService(semesterId)

    const payload: TPayload<IStudent> = {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get semester successfully',
      data: semester,
    }
    sendResponse(res, payload)
  } catch (error) {
    next(error)
  }
}

export const updateSingleSemester: RequestHandler = async (req, res, next) => {
  try {
    const { semesterId } = req.params
    const semester = await studentService.updateSingleStudentService(semesterId, req.body)

    const payload: TPayload<IStudent> = {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Update semester successfully',
      data: semester,
    }
    sendResponse(res, payload)
  } catch (error) {
    next(error)
  }
}

export const deleteSingleSemester: RequestHandler = async (req, res, next) => {
  try {
    const { semesterId } = req.params
    const semester = await studentService.deleteSingleStudentService(semesterId)
    const payload: TPayload<IStudent> = {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester deleted successfully',
      data: semester,
    }
    sendResponse(res, payload)
  } catch (error) {
    next(error)
  }
}
