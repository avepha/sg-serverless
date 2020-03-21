import {sensorLogger, sensorLoggerSave, sensorLoggerCsv} from './domain/sensor_logger/handler'
import {channelLogger, channelLoggerSave} from './domain/channel_logger/handler'
import {user, userRegister} from './domain/user/handler'
import {userDeviceRegister, deviceRegister} from './domain/device/handler'
import {sendSms, sendEmail, sgOnlineEvent, sgOfflineEvent} from './domain/notification/handler'
import {playground} from './domain/playgroud/handler'
import prepareHandler from './helper/prepareHandler'

export default function getHandler() {
  const handlers = {
    sensorLogger,
    sensorLoggerSave,
    sensorLoggerCsv,
    channelLogger,
    channelLoggerSave,
    user,
    userRegister,
    userDeviceRegister,
    deviceRegister,
    sendSms,
    sendEmail,
    sgOnlineEvent,
    sgOfflineEvent,
    playground
  }
  return prepareHandler(handlers)
}
