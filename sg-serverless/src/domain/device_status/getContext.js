import {connection} from '../../datasource/dynamodb'
import SensorLogger from './model/SensorLogger'
export default async function getContext() {
  const sgSensorLogger = await new SensorLogger(connection)
  return {
    sgSensorLogger
  }
}
