import moment from 'moment'
import MongoDAO from '../../../mongoDAO'
import {Schema} from 'mongoose'

const SmsNotificationSchema = new Schema({
  mid: String,
  last_notify_time: Date,
  message: String
})

export default class UserDevice extends MongoDAO {
  constructor(connection) {
    super(connection.model('Notification', SmsNotificationSchema))
  }

  find({mid}, {limit}){
    return this.__queryAfterBeforeLimit({mid}, {}, 'last_notify_time', {limit})
  }

  create(mid, {message}){
    const notification = new this.Model({
      mid,
      message,
      last_notify_time: moment().utc()
    })

    return notification.save()
  }
}
