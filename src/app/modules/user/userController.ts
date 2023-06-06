import { RequestHandler } from 'express'
import * as userService from './userService'

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const data = await userService.createUser(req.body)

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
