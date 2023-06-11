import express from 'express'
import { validatorMiddleware } from '../../middleware/validatorMiddleware'
import { departmentUpdateValidationZod, departmentValidationZod } from './departmentValidation'
import * as departmentController from './departmentController'

const departmentRouter = express.Router()

departmentRouter.post('/create', validatorMiddleware(departmentValidationZod), departmentController.createDepartment)
departmentRouter.get('/all', departmentController.getAllDepartment)

// params route
departmentRouter.get('/:departmentId', departmentController.getSingleDepartment)
departmentRouter.patch(
  '/:departmentId',
  validatorMiddleware(departmentUpdateValidationZod),
  departmentController.updateSingleDepartment
)
departmentRouter.delete('/:departmentId', departmentController.deleteSingleDepartment)

export default departmentRouter
