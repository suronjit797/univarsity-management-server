import express from 'express'
import * as studentController from './studentController'

const studentRouter = express.Router()


studentRouter.get('/all', studentController.getAllStudents)

export default studentRouter
