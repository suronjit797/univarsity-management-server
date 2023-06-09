import { RequestHandler } from 'express'
import * as semesterService from './semesterService'
import { TPayload } from '../../../interfaces/responseInterface'
import { ISemester } from './semesterInterface'
import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'

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
