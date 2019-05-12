import SensorLogger from './model/SensorLogger'
export default async function getContext() {
  const sgSensorLogger = await new SensorLogger()
  return {
    sgSensorLogger
  }
}
