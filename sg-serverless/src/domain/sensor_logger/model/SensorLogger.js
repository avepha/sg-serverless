import DynamoDA0 from '../../../dynamoDA0'
import dynamoose from 'dynamoose'
import moment from 'moment'

const Schema = dynamoose.Schema

const SensorLoggerSchema = new Schema({
  mid: {type: String, hashKey: true},
  timestamp: {type: Number, rangeKey: true},
  created_time: {type: String, rangeKey: true},
  sensors: {type: Object},
})

export default class SensorLogger extends DynamoDA0 {
  constructor() {
    return super(dynamoose.model('SensorLoggers', SensorLoggerSchema))
  }

  create(mid, {sensors}) {
    const now = moment().unix()
    const _sensors = new this.Model({
      mid,
      timestamp: now,
      created_time: moment().toISOString(),
      sensors
    })
    return _sensors.save()
  }

  findByMid(mid, {after, before, limit = 10}) {
    const _after = _.isNil(after) ? 0 : moment(after).unix()
    const _before = _.isNil(before) ? Number.MAX_SAFE_INTEGER : moment(before).unix()
    return this.Model.query('mid').eq(mid)
      .where('timestamp').between(_after, _before)
      .limit(limit)
      .exec()
  }
}
