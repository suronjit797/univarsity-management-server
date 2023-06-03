import { Request, Response } from 'express'
import * as userService from './userService'

export const createUser = async (req: Request, res: Response) => {
  const { uid, role, password } = req.body
  console.log(req.body)

  const data = await userService.createUser({ uid, role, password })

  res.status(200).send({
    success: true,
    message: 'User created successfully',
    results: data,
  })
}
