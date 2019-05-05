import DynamoDA0 from '../../../dynamoDA0'
import moment from 'moment'

const DeviceStatusSchema = {
  partitionKey: {name: 'mid', keyType: 'HASH', attributeType: 'S'},
  sortKey: {name: 'timestamp', keyType: 'RANGE', attributeType: 'N'}
}

export default class DeviceStatus extends DynamoDA0 {

  constructor(connection) {
    const tableName = 'DeviceStatus'
    return super(connection, tableName, DeviceStatusSchema)
  }

  upsertByStatus(mid, status) {
    const params = {
      TableName: this.tableName,
      Item:{
        mid,
        timestamp: moment().unix(),
        created_time: moment().toISOString(),
        status
      }
    }
    return this.docClient.put(params).promise()
  }

  find(mid, {before, after, limit}) {
    return this.__queryWithAfterBeforeLimit('mid', mid, {before, after, limit})
  }
}
