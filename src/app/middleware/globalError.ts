import { ErrorRequestHandler } from 'express'
import config from '../../config'
import { IErrorMessage } from '../../interfaces/genericError'
import { errorLogger } from '../../shared/logger'
import { ZodError } from 'zod'
// errors
import handleZodError from '../../ErrorHandler/handleZodError'
import handleValidationError from '../../ErrorHandler/handleValidationError'
import handleCastError from '../../ErrorHandler/handleCastError'

// eslint-disable-next-line no-unused-vars
const globalError: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500
  let message = error.message || 'Internal server error occurred'
  let errorMessages: IErrorMessage[] = [
    {
      path: '',
      message: error.message || 'Internal server error occurred',
    },
  ]

  if (error?.name === 'ValidationError') {
    const genericError = handleValidationError(error)
    errorMessages = genericError.errorMessages
    statusCode = genericError.statusCode
    message = genericError.message
  } else if (error instanceof ZodError) {
    const zodError = handleZodError(error)
    errorMessages = zodError.errorMessages
    statusCode = zodError.statusCode
    message = zodError.message
  } else if (error?.name === 'CastError') {
    const castError = handleCastError(error)
    errorMessages = castError.errorMessages
    statusCode = castError.statusCode
    message = castError.message
  }

  errorLogger(` [${statusCode}]: ${message}`)

  return res.status(statusCode).send({
    success: false,
    message,
    errorMessages,
    stack: config.NODE_ENV !== 'production' && error?.stack,
  })
}

export default globalError
