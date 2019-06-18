import {sensorLogger, sensorLoggerSave, sensorLoggerCsv} from './domain/sensor_logger/handler'
import {user, userRegister} from './domain/user/handler'
import {userDeviceRegister, deviceRegister} from './domain/device/handler'
import {sendSms} from './domain/sms_notification/handler'
import {playground} from './domain/playgroud/handler'
import prepareHandler from './helper/prepareHandler'

export default function getHandler() {
  const handlers = {
    sensorLogger,
    sensorLoggerSave,
    sensorLoggerCsv,
    user,
    userRegister,
    userDeviceRegister,
    deviceRegister,
    sendSms,
    playground
  }
  return prepareHandler(handlers)
}
