import mongoose from 'mongoose'

import config from './config'
import app from './app'

import { errorLogger, logger } from './shared/logger'

const bootFunctions = async () => {
  try {
    if (!config.PORT) {
      return errorLogger.error('Port is not found')
    }

    await mongoose.connect(config.DB_URI as string)
    logger.info('🛢 Database connected...')
    app.listen(config.PORT, () => {
      logger.info(`App listening on port ${config.PORT}...`)
      logger.info(config.DB_URI)
    })
  } catch (error) {
    errorLogger.error('Database connection failed')
  }
}

bootFunctions()
