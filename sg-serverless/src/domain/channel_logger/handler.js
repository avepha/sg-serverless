import _ from 'lodash'
import response from '../../helper/response'

// Mutation
export async function channelLoggerSave(event, {sgChannelLogger}) {
  if (_.isNil(event.body)) {
    return null
  }

  try {
    const {mid, channel, status, datetime} = JSON.parse(event.body)
    await sgChannelLogger.create(mid, {channel, status, datetime})
  }
  catch (e) {
    return response.failure(e)
  }

  return response.success({
    success: true
  })
}

// Query
export async function channelLogger(event, {sgChannelLogger}) {
  if (_.isNil(event.queryStringParameters)) {
    return response.badRequest({status: 'mid is not defined'})
  }

  try {
    const {mid, channel, after, before, limit} = event.queryStringParameters
    const result = await sgChannelLogger.find({mid, channel}, {after, before, limit})
    return response.success(result)
  }
  catch (e) {
    return response.failure(e)
  }

}
