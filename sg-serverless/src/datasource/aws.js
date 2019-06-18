import aws from 'aws-sdk'
import config from '../config'

const {accessKeyId, secretAccessKey} = config.aws
const {bucket} = config.aws.s3
const s3 = new aws.S3({accessKeyId, secretAccessKey})
const sms = new aws.SNS({apiVersion: '2010-03-31'})

export function s3Upload(key, stream) {
  return s3.upload({
    Bucket: bucket, Key: key, Body: stream, ACL: 'public-read'
  }).promise()
}

export function s3PresignedUrl(key) {
  return s3.getSignedUrl('getObject', {
    Bucket: bucket, Key: key, Expires: 60
  })
}

export async function publishSMS(phone, message) {
  return sms.publish({
    Message: message, /* required */
    PhoneNumber: phone,
  }).promise()
}
