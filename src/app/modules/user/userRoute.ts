import express from 'express'
import * as userController from './userController'
const router = express.Router()

router.post('/create', userController.createUser)

export default router
