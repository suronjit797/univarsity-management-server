import express from 'express'
import * as userController from './userController'

const userRouter = express.Router()

// userRouter.post('/create', validatorMiddleware(userValidationZod), userController.createUser)
// userRouter.post('/create-student', validatorMiddleware(studentValidationZod), userController.createStudent)

userRouter.get('/all', userController.getAllUsers)

export default userRouter
