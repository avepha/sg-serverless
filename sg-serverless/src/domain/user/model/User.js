import _ from 'lodash'
import moment from 'moment'
import MongoDAO from '../../../mongoDAO'
import {Schema} from 'mongoose'

const UserSchema = new Schema({
  identityId: {type: String, unique: true},
  profile: new Schema({
    name: {type: String},
    tel: {type: String, unique: true},
    email: {type: String, unique: true}
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

  edit(user, {name, tel, email}) {
    let update = false
    if(!_.isNil(name)) {
      update = true
      user.profile.name = name
    }

    if(!_.isNil(tel)) {
      update = true
      user.profile.tel = tel
    }

    if(!_.isNil(email)) {
      update = true
      user.profile.email = email
    }


    return update ? user.save() : user
  }
 }
