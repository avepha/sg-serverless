import _ from 'lodash'
import response from '../../helper/response'
export async function sensorLoggerSave(event, {sgSensorLogger}) {
  if (_.isNil(event.mid)) {
    return null
  }

  const {mid, sensors} = event
  return sgSensorLogger.create(mid, {sensors})
}

export async function sensorLogger(event, {sgSensorLogger}) {
  if (_.isNil(event.queryStringParameters)) {
    return response.badRequest({status: 'mid is not defined'})
  }

  const {mid, after, before, limit} = event.queryStringParameters
  const result = await sgSensorLogger.findByMid(mid, {after, before, limit})
  return response.success(result)
}
