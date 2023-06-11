import express from 'express'
import semesterRouter from './modules/academicSemester/semesterRoute'
import userRouter from './modules/user/userRoute'
import facultyRouter from './modules/academicFaculty/facultyRoute'

const router = express.Router()

const moduleRoute = [
  { path: '/users', routes: userRouter },
  { path: '/semester', routes: semesterRouter },
  { path: '/faculty', routes: facultyRouter },
]

moduleRoute.forEach((route) => router.use(route.path, route.routes))

export default router
