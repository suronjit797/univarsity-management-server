import { RequestHandler } from 'express'
import * as userService from './userService'

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { uid, role, password } = req.body

    if (!password) {
      throw new Error('password is required')
    }

    const data = await userService.createUser({ uid, role, password })

    if (!data) {
      next('User Create Failed')
    }

    res.status(200).send({
      success: true,
      message: 'User created successfully',
      results: data,
    })
  } catch (error) {
    next(error)
  }
}
