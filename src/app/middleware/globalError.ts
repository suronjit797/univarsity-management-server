import { NextFunction, Request, Response } from 'express'
import config from '../../config'
import { handleValidationError } from '../../ErrorHandler/HandlerValidationError'
import { IErrorMessage } from '../../interfaces/genericError'
import { Error } from 'mongoose'

const globalError = (err: Error.ValidationError, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500
  let message = 'Internal server error occurred'
  let errorMessages: IErrorMessage[] = []

  if (err?.name === 'ValidationError') {
    errorMessages = handleValidationError(err)
    statusCode = 400
    message = 'Please provide required fields'
  }

  res.status(statusCode).send({
    success: false,
    message,
    errorMessages,
    stack: config.NODE_ENV !== 'production' && err?.stack,
  })
  next()
}

export default globalError
