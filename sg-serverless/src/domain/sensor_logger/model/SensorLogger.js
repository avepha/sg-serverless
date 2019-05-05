import DynamoDA0 from '../../../dynamoDA0'
import moment from 'moment'


const SensorLoggerSchema = {
  partitionKey: {name: 'mid', keyType: 'HASH', attributeType: 'S'},
  sortKey: {name: 'timestamp', keyType: 'RANGE', attributeType: 'N'}
}

export default class SensorLogger extends DynamoDA0 {

  constructor(connection) {
    const tableName = 'SensorLoggers'
    return super(connection, tableName, SensorLoggerSchema)
  }

  upsertLoggerByTime(mid, log) {
    const params = {
      TableName: this.tableName,
      Item:{
        mid,
        timestamp: moment().unix(),
        created_time: moment().toISOString(),
        log
      }
    }
    return this.docClient.put(params).promise()
  }

  findByMidAndStatus(mid, status) {
    return this.docClient.query({
      TableName: this.tableName
    })
  }
}
