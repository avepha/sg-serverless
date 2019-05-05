import {sensorLogger, sensorLoggerSave} from './domain/sensor_logger/handler'
import {playground} from './domain/playgroud_domain/handler'
import prepareHandler from './helper/prepareHandler'

export default function getHandler() {
  const handlers = {
    sensorLogger,
    sensorLoggerSave,
    playground
  }
  return prepareHandler(handlers)
}
