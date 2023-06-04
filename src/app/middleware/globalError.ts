import { ErrorRequestHandler } from 'express'
import config from '../../config'
import { handleValidationError } from '../../ErrorHandler/HandlerValidationError'
import { IErrorMessage } from '../../interfaces/genericError'
import { errorLogger } from '../../shared/logger'

const globalError: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500
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
  }

  errorLogger(message)

  res.status(statusCode).send({
    success: false,
    message,
    errorMessages,
    stack: config.NODE_ENV !== 'production' && error?.stack,
  })
  next()
}

export default globalError
