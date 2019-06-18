// Mutation
import _ from 'lodash'

export async function userDeviceRegister(event, {sgUserDevice}) {
  if (_.isNil(event.body)) {
    throw new Error('Invalid input')
  }

  const {mid, user} = event.body

  return sgUserDevice.upsertByMidAndUser(mid, user)
}

export async function deviceRegister(event, {sgDevice}) {
  if (_.isNil(event.body)) {
    throw new Error('Invalid input')
  }

  const {mid, profile} = event.body
  return sgDevice.create(mid, {profile})
}


