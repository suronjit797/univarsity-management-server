import express from 'express'
import * as studentController from './studentController'
import { validatorMiddleware } from '../../middleware/validatorMiddleware'
import { studentValidationZod } from './studentValidator'

const studentRouter = express.Router()

studentRouter.get('/all', studentController.getAllStudents)
studentRouter.post('/create-student', validatorMiddleware(studentValidationZod), studentController.createStudent)

export default studentRouter
