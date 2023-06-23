import express from 'express'
import * as userController from './userController'
import { studentValidationZod } from './userValidation'
import { validatorMiddleware } from '../../middleware/validatorMiddleware'

const userRouter = express.Router()

// userRouter.post('/create', validatorMiddleware(userValidationZod), userController.createUser)
userRouter.post('/create-student', validatorMiddleware(studentValidationZod), userController.createStudent)

userRouter.get('/', userController.getAllUsers)

export default userRouter
