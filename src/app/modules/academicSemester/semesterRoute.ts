import express from 'express'
import { validatorMiddleware } from '../../middleware/validatorMiddleware'
import { semesterValidationZod } from './semesterValidation'
import * as semesterController from './semesterController'

const semesterRouter = express.Router()

semesterRouter.post('/create', validatorMiddleware(semesterValidationZod), semesterController.createSemester)

export default semesterRouter
