import response from '../../helper/response'

export async function playground(event, {sgChannelLogger}) {
  const body = {
    mid: '123456789',
    channel: 1,
    status: true,
    datetime: new Date().toISOString(),
  }

  try {
    const {mid, channel, status, datetime} = JSON.parse(JSON.stringify(body))
    await sgChannelLogger.create(mid, {channel, status, datetime})
  }
  catch (e) {
    return response.failure(e)
  }

  return response.success({
    success: true
  })
}
