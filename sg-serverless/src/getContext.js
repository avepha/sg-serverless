import SensorLogger from './domain/sensor_logger/getContext'
import User from './domain/user/getContext'
import Device from './domain/device/getContext'
import SmsNotification from './domain/notification/getContext'
import Playground from './domain/playgroud/getContext'

export default async function getContext() {
  const sensorLogger = await SensorLogger()
  const playground = await Playground()

  return {
    ...User(),
    ...Device(),
    ...SmsNotification(),
    ...sensorLogger,
    ...playground
  }
}
