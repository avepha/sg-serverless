import aws from 'aws-sdk'

aws.config.update({region: 'ap-southeast-1'})
export const dynamodb = new aws.DynamoDB()
export const docClient = new aws.DynamoDB.DocumentClient()

