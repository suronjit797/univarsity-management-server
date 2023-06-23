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
