import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'

import globalError from './app/middleware/globalError'
import userRoute from './app/modules/user/userRoute'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('tiny'))

// route
app.use('/api/v1/users', userRoute)

app.get('/', async (req: Request, res: Response, next) => {
  res.send('<h1> Welcome to PH University </h1>')
  next()
})

app.use(globalError)
export default app
