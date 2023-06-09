import express from 'express'
import semesterRouter from './modules/academicSemester/semesterRoute'
import userRouter from './modules/user/userRoute'

const router = express.Router()

router.use('/users', userRouter)
router.use('/semester', semesterRouter)

export default router
