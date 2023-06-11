import express from 'express'
import { validatorMiddleware } from '../../middleware/validatorMiddleware'
import { semesterUpdateValidationZod, semesterValidationZod } from './semesterValidation'
import * as semesterController from './semesterController'

const semesterRouter = express.Router()

semesterRouter.post('/create', validatorMiddleware(semesterValidationZod), semesterController.createSemester)
semesterRouter.get('/all', semesterController.getAllSemester)

// params route
semesterRouter.get('/:semesterId', semesterController.getSingleSemester)
semesterRouter.patch(
  '/:semesterId',
  validatorMiddleware(semesterUpdateValidationZod),
  semesterController.updateSingleSemester
)
semesterRouter.delete('/:semesterId', semesterController.deleteSingleSemester)

export default semesterRouter
