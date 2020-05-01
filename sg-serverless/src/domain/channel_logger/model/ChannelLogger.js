import _ from 'lodash'
import moment from 'moment'
import MongoDAO from '../../../mongoDAO'
import {Schema} from 'mongoose'

const ChannelLoggerSchema = new Schema({
  mid: {type: String},
  datetime: Date,
  status: {type: Boolean},
  channel: {type: Number},
})

export default class ChannelLogger extends MongoDAO {
  constructor(connection) {
    super(connection.model('ChannelLogger', ChannelLoggerSchema))
  }

  create(mid, {channel, status, datetime}) {
    const newLogger = new this.Model({
      mid,
      datetime: moment.utc(datetime).valueOf(),
      channel,
      status,
    })

    return newLogger.save()
  }

  find({mid, channel}, {after, before, limit = 10}) {
    const _after = _.isNil(after) ? undefined : moment.utc(after).valueOf()
    const _before = _.isNil(before) ? undefined : moment.utc(before).valueOf()

    let filter = {}
    if (!_.isNil(mid)) {
      filter = {...filter, mid}
    }

    if (!_.isNil(channel)) {
      filter = {...filter, channel}
    }

    return this.__queryAfterBeforeLimit(filter, {}, 'datetime', {after: _after, before: _before, limit})
  }
}
