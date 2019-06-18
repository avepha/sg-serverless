import _ from 'lodash'

export async function userRegister(event, {sgUser}) {
  if (_.isNil(event.body)) {
    throw new Error('Invalid parameter')
  }

  const {identityId, profile} = event.body
  return sgUser.create(identityId, {profile})
}

export async function user(event, {sgUser}) {
  if (_.isNil(event.queryStringParameters)) {
    throw new Error('Invalid parameter')
  }

  const {id} = event.queryStringParameters
  return sgUser.findOne(id)
}
