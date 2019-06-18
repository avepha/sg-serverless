import _ from 'lodash'
import moment from 'moment'
import MongoDAO from '../../../mongoDAO'
import {Schema} from 'mongoose'

const UserSchema = new Schema({
  identityId: {type: String, unique: true},
  profile: new Schema({
    name: {type: String},
    tel: {type: String, unique: true},
  }, {_id: false}),
  created_time: Date,
  updated_time: Date,
})

export default class User extends MongoDAO {
  constructor(connection) {
    super(connection.model('User', UserSchema))
  }

  create(identityId, {profile}) {
    if (_.isNil(identityId)) {
      throw new Error('No identityId Error')
    }

    const now = moment().utc()
    const newUser = new this.Model({
      identityId,
      profile,
      updated_time: now,
      created_time: now
    })
    return newUser.save()
  }
 }
