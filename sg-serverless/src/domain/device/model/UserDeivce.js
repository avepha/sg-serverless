import MongoDAO from '../../../mongoDAO'
import {Schema} from 'mongoose'

const UserDeviceSchema = new Schema({
  mid: {type: String, ref: 'Device'},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
})

UserDeviceSchema.index({mid: 1, user: 1}, {unique: true})

export default class UserDevice extends MongoDAO {
  constructor(connection) {
    super(connection.model('UserDevice', UserDeviceSchema))
  }

  find({mid, user}, {limit}){
    let filter = {}
    if (!_.isNil(mid)) {
      filter = {...filter, mid}
    }

    if (!_.isNil(user)) {
      filter = {...filter, user}
    }

    return this.__queryAfterBeforeLimit(filter, {}, '_id', {limit})
  }

  upsertByMidAndUser(mid, user) {
    return this.Model.findOneAndUpdate(
      {mid, user},
      {$set: {mid, user}},
      {upsert: true}
    ).catch(err => {
      if (err.code !== 11000) {
        throw err
      }

      return this.Model.findOne({mid, user})
    })
  }
}
