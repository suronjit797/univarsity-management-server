import { createLogger, format, transports } from 'winston'
import moment from 'moment'
import 'colors'
import DailyRotateFile from 'winston-daily-rotate-file'

const { combine, timestamp, label, printf } = format

const successFormate = printf(({ level, message, timestamp }) => {
  const time = moment(timestamp).format('DD/MM/yyyy h:mm:ss')
  return ` ${level}: ${time}:` + ` ${message}`
})
const errorFormate = printf(({ level, message, timestamp }) => {
  const time = moment(timestamp).format('DD/MM/yyyy h:mm:ss')
  return ` ${level}: ${time}:` + ` ${message}`
})

export const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'UM' }), timestamp(), successFormate),
  transports: [
    // new transports.File({ filename: `log/winston-${moment().format('DD-MM-YYYY')}/success.log`, level: 'info' }),
    new DailyRotateFile({
      filename: 'log/winston/success/%DATE%_success.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})
export const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'UM' }), timestamp(), errorFormate),
  transports: [
    // new transports.File({ filename: 'log/winston/error.log', level: 'error' })
    new DailyRotateFile({
      filename: 'log/winston/errors/%DATE%_error.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

const successFormateConsole = printf(({ level, message, timestamp }) => {
  const time = moment(timestamp).format('DD/MM/yyyy h:mm:ss')
  return ` ${level}: ${time}:` + ` ${message}`.green.bold
})
const errorFormateConsole = printf(({ level, message, timestamp }) => {
  const time = moment(timestamp).format('DD/MM/yyyy h:mm:ss')
  return ` ${level}: ${time}:` + ` ${message}`.red.bold
})

// console log
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: combine(label({ label: 'UM' }), format.colorize(), successFormateConsole),
    })
  )
  errorLogger.add(
    new transports.Console({
      format: combine(label({ label: 'UM' }), format.colorize(), errorFormateConsole),
    })
  )
}
