import { RequestHandler } from 'express'
import * as semesterService from './semesterService'
import { TPayload } from '../../../interfaces/responseInterface'
import { ISemester } from './semesterInterface'
import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import pic from '../../../shared/pick'
import { paginationOptionArr } from '../../../constants/pagination'
import AcademicSemester from './semesterModel'
import { searchingAndFiltering } from '../../../helper/searchingHelper'
import { ISearchingAndFiltering } from '../../../interfaces/searchingAndFiltering'

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
    const partialSearchableFields = ['title', 'code']
    // get searching and filtering data
    const filter: ISearchingAndFiltering = searchingAndFiltering(req, new AcademicSemester(), partialSearchableFields)

    // get pagination data
    const paginationOption = pic(req.query, paginationOptionArr)

    // service
    const semesters = await semesterService.getAllSemesterService(filter, paginationOption)

    const payload: TPayload<ISemester[]> = {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get semester successfully',
      meta: semesters.meta,
      data: semesters.data,
    }
    sendResponse(res, payload)
  } catch (error) {
    next(error)
  }
}

export const getSingleSemester: RequestHandler = async (req, res, next) => {
  try {
    const { semesterId } = req.params
    const semester = await semesterService.getSingleSemesterService(semesterId)

    const payload: TPayload<ISemester> = {
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
    const semester = await semesterService.updateSingleSemesterService(semesterId, req.body)

    const payload: TPayload<ISemester> = {
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
