import _ from 'lodash'

export async function userRegister(event, {sgUser}) {
  if (_.isNil(event.body) || _.isNil(event.body.identityId) || _.isNil(event.body.profile) ) {
    throw new Error('Invalid parameter')
  }

  const {identityId, profile} = event.body
  const user = await sgUser.findOneBy({identityId})
  if(user  !== null) {
    return sgUser.edit(user, profile)
  }

  return sgUser.create(identityId, {profile})
}

export async function user(event, {sgUser}) {
  if (_.isNil(event.queryStringParameters)) {
    throw new Error('Invalid parameter')
  }

  const {id} = event.queryStringParameters
  return sgUser.findOne(id)
}
