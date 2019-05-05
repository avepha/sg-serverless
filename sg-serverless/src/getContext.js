import SensorLogger from './domain/sensor_logger/getContext'

export default async function getContext() {
  const sensorLogger = await SensorLogger()

  return {
    ...sensorLogger
  }
}
