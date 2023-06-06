import express from 'express'
import * as userController from './userController'
import { userValidationZod } from './userValidation'
import { validatorMiddleware } from '../../middleware/validatorMiddleware'

const router = express.Router()

router.post('/create', validatorMiddleware(userValidationZod), userController.createUser)

export default router
