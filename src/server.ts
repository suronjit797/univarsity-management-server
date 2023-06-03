import mongoose from 'mongoose'
import 'colors'
import userRoute from './app/modules/user/userRoute'

import config from './config'
import app from './app'

const bootFunctions = async () => {
  try {
    await mongoose.connect(config.DB_URI as string)
    console.log('🛢 Database connected'.blue.bold)
    app.listen(config.PORT, () => {
      console.log(`App listening on port ${config.PORT}...`.green.bold)
      console.log(config.DB_URI)
    })
  } catch (error) {
    console.log('Database connection failed'.red.bold)
  }
}

app.use('/v1/users', userRoute)

bootFunctions()
