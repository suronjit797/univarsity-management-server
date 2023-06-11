import express from 'express'
import { validatorMiddleware } from '../../middleware/validatorMiddleware'
import { facultyUpdateValidationZod, facultyValidationZod } from './facultyValidation'
import * as facultyController from './facultyController'

const facultyRouter = express.Router()

facultyRouter.post('/create', validatorMiddleware(facultyValidationZod), facultyController.createFaculty)
facultyRouter.get('/all', facultyController.getAllFaculty)

// params route
facultyRouter.get('/:facultyId', facultyController.getSingleFaculty)
facultyRouter.patch(
  '/:facultyId',
  validatorMiddleware(facultyUpdateValidationZod),
  facultyController.updateSingleFaculty
)
facultyRouter.delete('/:facultyId', facultyController.deleteSingleFaculty)

export default facultyRouter
