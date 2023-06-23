import { RequestHandler } from 'express'
import * as facultyService from './facultyService'
import { TPayload } from '../../../interfaces/responseInterface'
import { IFaculty } from './facultyInterface'
import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import pic from '../../../shared/pick'
import { paginationOptionArr } from '../../../constants/pagination'
import AcademicFacultyModel from './facultyModel'
import { searchingAndFiltering } from '../../../helper/searchingHelper'
import { ISearchingAndFiltering } from '../../../interfaces/searchingAndFiltering'

export const createFaculty: RequestHandler = async (req, res, next) => {
  try {
    const data = await facultyService.createFaculty(req.body)

    const payload: TPayload<IFaculty> = {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty created successfully',
      data,
    }
    sendResponse(res, payload)
  } catch (error) {
    next(error)
  }
}

export const getAllFaculty: RequestHandler = async (req, res, next) => {
  try {
    const partialSearchableFields = ['title']
    // get searching and filtering data
    const filter: ISearchingAndFiltering = searchingAndFiltering(
      req,
      new AcademicFacultyModel(),
      partialSearchableFields
    )

    // get pagination data
    const paginationOption = pic(req.query, paginationOptionArr)

    // service
    const faculties = await facultyService.getAllFacultyService(filter, paginationOption)

    const payload: TPayload<IFaculty[]> = {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get faculty successfully',
      meta: faculties.meta,
      data: faculties.data,
    }
    sendResponse(res, payload)
  } catch (error) {
    next(error)
  }
}

export const getSingleFaculty: RequestHandler = async (req, res, next) => {
  try {
    const { facultyId } = req.params
    const faculty = await facultyService.getSingleFacultyService(facultyId)

    const payload: TPayload<IFaculty> = {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get faculty successfully',
      data: faculty,
    }
    sendResponse(res, payload)
  } catch (error) {
    next(error)
  }
}

export const updateSingleFaculty: RequestHandler = async (req, res, next) => {
  try {
    const { facultyId } = req.params
    const faculty = await facultyService.updateSingleFacultyService(facultyId, req.body)

    const payload: TPayload<IFaculty> = {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Update faculty successfully',
      data: faculty,
    }
    sendResponse(res, payload)
  } catch (error) {
    next(error)
  }
}

export const deleteSingleFaculty: RequestHandler = async (req, res, next) => {
  try {
    const { facultyId } = req.params
    const faculty = await facultyService.deleteSingleFacultyService(facultyId)
    const payload: TPayload<IFaculty> = {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty deleted successfully',
      data: faculty,
    }
    sendResponse(res, payload)
  } catch (error) {
    next(error)
  }
}
