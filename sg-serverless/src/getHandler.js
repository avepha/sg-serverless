import {sensorLogger, sensorLoggerSave} from './domain/sensor_logger/handler'
import prepareHandler from './helper/prepareHandler'

export default function getHandler() {
  const handlers = {
    sensorLogger,
    sensorLoggerSave
  }
  return prepareHandler(handlers)
}
