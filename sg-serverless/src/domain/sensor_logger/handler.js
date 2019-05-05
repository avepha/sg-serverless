import _ from 'lodash'

export async function sensorLoggerSave(event, {sgSensorLogger}) {
  if(_.isNil(event.mid)) {
    return null
  }

  const {mid, sensors, paracc, gpio} = event

  return sgSensorLogger.upsertLoggerByTime(mid, {
    sensors,
    paracc,
    gpio
  })
}

export async function sensorLogger(event, {sgSensorLogger}) {
  if(_.isNil(event.mid)) {
    return null
  }
  const {mid, after, before, limit} = event
  return sgSensorLogger.find(mid, {after, before, limit})
}
