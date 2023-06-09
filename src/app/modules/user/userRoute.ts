import express from 'express'
import * as userController from './userController'
import { userValidationZod } from './userValidation'
import { validatorMiddleware } from '../../middleware/validatorMiddleware'

const userRouter = express.Router()

userRouter.post('/create', validatorMiddleware(userValidationZod), userController.createUser)

export default userRouter
