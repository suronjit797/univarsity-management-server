import express from 'express'
import semesterRouter from './modules/academicSemester/semesterRoute'
import userRouter from './modules/user/userRoute'
import facultyRouter from './modules/academicFaculty/facultyRoute'
import departmentRouter from './modules/academicDepartment/departmentRoute'
import studentRouter from './modules/student/studentRoute'

const router = express.Router()

const moduleRoute = [
  { path: '/users', routes: userRouter },
  { path: '/semester', routes: semesterRouter },
  { path: '/faculty', routes: facultyRouter },
  { path: '/department', routes: departmentRouter },
  { path: '/student', routes: studentRouter },
]

moduleRoute.forEach((route) => router.use(route.path, route.routes))

export default router
