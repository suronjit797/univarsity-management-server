import mongoose from 'mongoose'
import { IErrorMessage } from '../interfaces/genericError'

export const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const errors: IErrorMessage[] = Object.values(err.errors).map((item) => ({
    path: item?.path,
    message: item?.message,
  }))
  return errors
}
