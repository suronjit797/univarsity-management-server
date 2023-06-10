import mongoose from 'mongoose'

const handleCastError = (error: mongoose.Error.CastError) => {
  return {
    statusCode: 500,
    success: false,
    message: `${error.path} is invalid`,
    errorMessages: [{ path: error.path, message: error.message }],
  }
}

export default handleCastError
