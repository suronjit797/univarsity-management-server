import { RequestHandler } from 'express'
import * as departmentService from './departmentService'
import { TPayload } from '../../../interfaces/responseInterface'
import { IDepartment } from './departmentInterface'
import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import pic from '../../../shared/pick'
import { paginationOptionArr } from '../../../constants/pagination'
import AcademicDepartment from './departmentModel'
import { searchingAndFiltering } from '../../../helper/searchingHelper'
import { ISearchingAndFiltering } from '../../../interfaces/searchingAndFiltering'

export const createDepartment: RequestHandler = async (req, res, next) => {
  try {
    const data = await departmentService.createDepartment(req.body)

    const payload: TPayload<IDepartment> = {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Department created successfully',
      data,
    }
    sendResponse(res, payload)
  } catch (error) {
    next(error)
  }
}

export const getAllDepartment: RequestHandler = async (req, res, next) => {
  try {
    const partialSearchableFields = ['title']
    // get searching and filtering data
    const filter: ISearchingAndFiltering = searchingAndFiltering(req, new AcademicDepartment(), partialSearchableFields)

    // get pagination data
    const paginationOption = pic(req.query, paginationOptionArr)

    // service
    const faculties = await departmentService.getAllDepartmentService(filter, paginationOption)

    const payload: TPayload<IDepartment[]> = {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get Department successfully',
      meta: faculties.meta,
      data: faculties.data,
    }
    sendResponse(res, payload)
  } catch (error) {
    next(error)
  }
}

export const getSingleDepartment: RequestHandler = async (req, res, next) => {
  try {
    const { departmentId } = req.params
    const department = await departmentService.getSingleDepartmentService(departmentId)

    const payload: TPayload<IDepartment> = {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get Department successfully',
      data: department,
    }
    sendResponse(res, payload)
  } catch (error) {
    next(error)
  }
}

export const updateSingleDepartment: RequestHandler = async (req, res, next) => {
  try {
    const { departmentId } = req.params
    const department = await departmentService.updateSingleDepartmentService(departmentId, req.body)

    const payload: TPayload<IDepartment> = {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Update Department successfully',
      data: department,
    }
    sendResponse(res, payload)
  } catch (error) {
    next(error)
  }
}

export const deleteSingleDepartment: RequestHandler = async (req, res, next) => {
  try {
    const { departmentId } = req.params
    const department = await departmentService.deleteSingleDepartmentService(departmentId)
    const payload: TPayload<IDepartment> = {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Department deleted successfully',
      data: department,
    }
    sendResponse(res, payload)
  } catch (error) {
    next(error)
  }
}
