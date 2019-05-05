import _ from 'lodash'
import moment from 'moment'

export default class DynamoDA0 {
  constructor(connection, tableName, {partitionKey, sortKey}) {
    this.connection = connection.dynamodb
    this.docClient = connection.docClient
    this.tableName = tableName
    return new Promise(async resolve => {
      await this.__checkAndCreateTable(tableName, {partitionKey, sortKey})
      resolve(this)
    })
  }

  __listAllTables() {
    return this.connection.listTables({}).promise()
  }

  __checkTableExists(tableName) {
    return this.connection.listTables({}).promise()
      .then(({TableNames}) => {
        return _.includes(TableNames, tableName)
      })
  }

  __checkAndCreateTable(tableName, {partitionKey, sortKey}) {
    let KeySchema = []
    let AttributeDefinitions = []

    if (!_.isNil(partitionKey)) {
      KeySchema.push({AttributeName: partitionKey.name, KeyType: partitionKey.keyType})
      AttributeDefinitions.push({AttributeName: partitionKey.name, AttributeType: partitionKey.attributeType})
    }

    if (!_.isNil(sortKey)) {
      KeySchema.push({AttributeName: sortKey.name, KeyType: sortKey.keyType})
      AttributeDefinitions.push({AttributeName: sortKey.name, AttributeType: sortKey.attributeType})
    }

    return this.__checkTableExists(tableName)
      .then(exists => {
        return exists
          ? Promise.resolve(true)
          : this.connection.createTable({
            TableName: tableName,
            KeySchema,
            AttributeDefinitions,
            ProvisionedThroughput: {
              ReadCapacityUnits: 10,
              WriteCapacityUnits: 10
            }
          }).promise()
      })
  }

  __queryWithAfterBeforeLimit(key, valueOfKey, {after, before, limit}) {

    if (_.isNil(key)) {
      return []
    }

    let filter = {TableName: this.tableName}
    let ExpressionAttributeNames = {
      "#ts": "timestamp"
    }

    let ExpressionAttributeValues = {
      [`:${key}`]: valueOfKey,
      ':after': _.isNil(after) ?  0: moment(after).unix(),
      ':before': _.isNil(before) ? Number.MAX_SAFE_INTEGER : moment(before).unix(),
    }

    let KeyConditionExpression = `${key} = :${key} and #ts  between :after and :before`

    if (!_.isNil(limit)) {
      filter = {...filter, Limit: limit}
    }

    filter = {
      ...filter,
      KeyConditionExpression,
      ExpressionAttributeValues,
      ExpressionAttributeNames
    }
    return this.docClient.query(filter).promise()
  }
}
