import { RequestHandler } from 'express'
import * as userService from './userService'
import sendResponse from '../../../shared/sendResponse'
import { TPayload } from '../../../interfaces/responseInterface'
import httpStatus from 'http-status'
import { IUser } from './userInterface'
import pic from '../../../shared/pick'
import { paginationOptionArr } from '../../../constants/pagination'
import { searchingAndFiltering } from '../../../helper/searchingHelper'
import User from './userModel'
import { ISearchingAndFiltering } from '../../../interfaces/searchingAndFiltering'


export const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const paginationOption = pic(req.query, paginationOptionArr)

    const filter: ISearchingAndFiltering = searchingAndFiltering(req, new User(), ['uid, role'])

    const users = await userService.getAllUserService(filter, paginationOption)

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
