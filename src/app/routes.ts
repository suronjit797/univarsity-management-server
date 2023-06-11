import express from 'express'
import semesterRouter from './modules/academicSemester/semesterRoute'
import userRouter from './modules/user/userRoute'
import facultyRouter from './modules/academicFaculty/facultyRoute'
import departmentRouter from './modules/academicDepartment/departmentRoute'

const router = express.Router()

const moduleRoute = [
  { path: '/users', routes: userRouter },
  { path: '/semester', routes: semesterRouter },
  { path: '/faculty', routes: facultyRouter },
  { path: '/department', routes: departmentRouter },
]

moduleRoute.forEach((route) => router.use(route.path, route.routes))

export default router
