import { Response } from 'express'
import { TPayload, TResponse } from '../interfaces/responseInterface'

const sendResponse = <T>(res: Response, payload: TPayload<T>) => {
  const sendData: TResponse<T> = {
    success: payload.success,
    message: payload.message,
    meta: payload.meta,
    result: payload.data,
  }

  res.status(payload.statusCode).send(sendData)
}

export default sendResponse
