import _ from 'lodash'
import moment from 'moment'
import MongoDAO from '../../../mongoDAO'
import {Schema} from 'mongoose'

const DeviceSchema = new Schema({
  mid: {type: String, unique: true},
  profile: new Schema({
    name: String
  }, {_id: false}),
  created_time: Date,
  updated_time: Date
})

export default class User extends MongoDAO {
  constructor(connection) {
    super(connection.model('Device', DeviceSchema))
  }

  findOneByMid(mid){
    return this.Model.findOne({mid})
  }

  create(mid, {profile}) {
    if (_.isNil(mid)) {
      throw new Error('No mid Error')
    }

    const now = moment().utc()
    const newDevice = new this.Model({
      mid,
      profile,
      updated_time: now,
      created_time: now
    })

    return newDevice.save()
  }
}
