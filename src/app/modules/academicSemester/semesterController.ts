import { RequestHandler } from 'express'
import * as semesterService from './semesterService'

export const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const data = await semesterService.createSemester(req.body)
    res.status(200).send({
      success: true,
      message: 'Semester created successfully',
      results: data,
    })
  } catch (error) {
    next(error)
  }
}
