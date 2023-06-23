import express from 'express'
import * as studentController from './studentController'
import { validatorMiddleware } from '../../middleware/validatorMiddleware'
import { studentValidationZod } from './studentValidator'

const studentRouter = express.Router()

studentRouter.get('/all', studentController.getAllStudents)
studentRouter.post('/create-student', validatorMiddleware(studentValidationZod), studentController.createStudent)

studentRouter.get('/:id', studentController.getAllStudents)
studentRouter.patch('/:id', studentController.getAllStudents)
studentRouter.delete('/:id', studentController.getAllStudents)

export default studentRouter
