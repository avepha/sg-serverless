import _ from 'lodash'
import response from '../../helper/response'
import {loggerToCsv, uploadCsvAndPresignedUrl} from './util/util'

// Mutation
export async function sensorLoggerSave(event, {sgSensorLogger}) {
  if (_.isNil(event.mid)) {
    return null
  }

  const {mid, sensors} = event
  return sgSensorLogger.create(mid, {sensors})
}

// Query
export async function sensorLogger(event, {sgSensorLogger}) {
  if (_.isNil(event.queryStringParameters)) {
    return response.badRequest({status: 'mid is not defined'})
  }

  const {mid, after, before, limit} = event.queryStringParameters
  const result = await sgSensorLogger.findByMid(mid, {after, before, limit})
  return response.success(result)
}

export async function sensorLoggerCsv(event, {sgSensorLogger}) {
  // TODO: check query string can be undefined?, check all permission
  if (_.isNil(event.queryStringParameters)) {
    return response.badRequest({status: 'mid is not defined'})
  }

  const {mid, after, before, limit} = event.queryStringParameters

  const sensorLoggers = await sgSensorLogger.findByMid(mid, {after, before, limit})
  const csv = await loggerToCsv(sensorLoggers)
  const url = await uploadCsvAndPresignedUrl(csv, {mid, after, before})
  return response.redirect({
    Location: url
  })
}
