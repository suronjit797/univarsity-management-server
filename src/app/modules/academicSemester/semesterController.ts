import { RequestHandler } from 'express'
import * as semesterService from './semesterService'
import { TPayload } from '../../../interfaces/responseInterface'
import { ISemester } from './semesterInterface'
import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import pic from '../../../shared/pick'
import { paginationOptionArr } from '../../../constants/pagination'

export const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const data = await semesterService.createSemester(req.body)

    const payload: TPayload<ISemester> = {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully',
      data,
    }
    sendResponse(res, payload)
  } catch (error) {
    next(error)
  }
}

export const getAllSemester: RequestHandler = async (req, res, next) => {
  try {
    const paginationOption = pic(req.query, paginationOptionArr)
    const semesters = await semesterService.getAllSemester(paginationOption)

    const payload: TPayload<ISemester[]> = {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get user successfully',
      meta: semesters.meta,
      data: semesters.data,
    }
    sendResponse(res, payload)
  } catch (error) {
    next(error)
  }
}
