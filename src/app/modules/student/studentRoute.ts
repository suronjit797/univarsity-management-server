import express from 'express'
import * as studentController from './studentController'
import { validatorMiddleware } from '../../middleware/validatorMiddleware'
import { studentUpdateValidationZod } from './studentValidator'

const studentRouter = express.Router()

studentRouter.get('/all', studentController.getAllStudents)


studentRouter.get('/:studentId', studentController.getSingleSemester)
studentRouter.patch('/:studentId',validatorMiddleware(studentUpdateValidationZod),  studentController.updateSingleSemester)
studentRouter.delete('/:studentId', studentController.deleteSingleSemester)

export default studentRouter
