import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('tiny'))

app.get('/', (req: Request, res: Response) => {
  res.send('<h1> Welcome to PH University </h1>')
})

export default app
