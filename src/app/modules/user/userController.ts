import { RequestHandler } from 'express'
import * as userService from './userService'
import sendResponse from '../../../shared/sendResponse'
import { TPayload } from '../../../interfaces/responseInterface'
import httpStatus from 'http-status'
import { IUser } from './userInterface'
import pic from '../../../shared/pick'
import { paginationOptionArr } from '../../../constants/pagination'

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const data = await userService.createUserService(req.body)

    if (!data) {
      next('User Create Failed')
    }
    const payload: TPayload<IUser | null> = {
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

export const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const paginationOption = pic(req.query, paginationOptionArr)
    
    const users = await userService.getAllUserService(paginationOption)

    const payload: TPayload<IUser[]> = {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get user successfully',
      meta: users.meta,
      data: users.data,
    }
    sendResponse(res, payload)
  } catch (error) {
    next(error)
  }
}
