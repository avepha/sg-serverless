import _ from 'lodash'
import moment from 'moment-timezone'
import {publishSMS} from '../../datasource/aws'
import {publishEmail} from '../../datasource/email'
import getTimeZoneByTel from './util/getTimeZoneByTel'

export async function sendSms(event, {sgSmsNotification, sgUserDevice, sgUser, sgDevice}) {
  if (_.isNil(event.mid)) {
    return null
  }
  const {mid, sensors} = event


  const lastNotifications = await sgSmsNotification.find({mid}, {limit: 1})
  if (lastNotifications !== null && lastNotifications.length > 0 && mid !== '000000000000') {

    const minimumTimeGap = 1000 * 60 * 60 * 3

    const lastNotifyTime = moment(lastNotifications[0].last_notify_time)
    const diff = moment().utc().diff(lastNotifyTime)
    if (diff < minimumTimeGap) {
      return false
    }
  }

  await sgSmsNotification.create(mid, {message: 'Temperature is too high'})

  const owners = await sgUserDevice.find({mid}, {limit: 100})

  await Promise.all(
    owners.map(async ({user}) => {
      const _user = await sgUser.findOne(user)
      const _device = await sgDevice.findOneByMid(mid)

      if(_.isNil(_user) || _.isNil(_device)) {
        return false
      }

      const tel = _.get(_user, 'profile.tel')
      const deviceName = _.get(_device, 'profile.name')

      const timeZone = getTimeZoneByTel(tel)
      const message = `Critical message: Sending from ${deviceName}, Temperature is too high, ${sensors.temperature} C at ${moment.tz(timeZone).format('MMMM Do YYYY, HH:mm:ss')}`
      return publishSMS(tel, message)
    })
  )

  return true
}
export async function sendEmail(event, {sgUserDevice, sgUser, sgDevice}) {
  if (_.isNil(event.mid)) {
    return null
  }

  const {mid, sensors} = event
  const owners = await sgUserDevice.find({mid}, {limit: 100})
  await Promise.all(
    owners.map(async ({user}) => {
      const _user = await sgUser.findOne(user)
      const _device = await sgDevice.findOneByMid(mid)

      if(_.isNil(_user) || _.isNil(_device)) {
        return false
      }

      const email = _.get(_user, 'profile.email')
      const deviceName = _.get(_device, 'profile.name')

      if (_.isNil(email)) {
        return false
      }

      const message = `Critical message: Sending from ${deviceName}, Temperature is too high, ${sensors.temperature} C at ${moment().format('MMMM Do YYYY, HH:mm:ss')}`
      return publishEmail(email, {topic: 'SG - Notification', message})
    })
  )

  return true
}

export async function sgOnlineEvent(event, {sgUserDevice, sgUser, sgDevice}) {
  if (_.isNil(event.mid)) {
    return null
  }

  const {mid} = event
  const owners = await sgUserDevice.find({mid}, {limit: 100})
  await Promise.all(
    owners.map(async ({user}) => {
      const _user = await sgUser.findOne(user)
      const _device = await sgDevice.findOneByMid(mid)

      if(_.isNil(_user) || _.isNil(_device)) {
        return false
      }

      const email = _.get(_user, 'profile.email')
      const deviceName = _.get(_device, 'profile.name')

      if (_.isNil(email)) {
        return false
      }

      const message = `Information message: Sending from ${deviceName}, SG is online, ${moment().format('MMMM Do YYYY, HH:mm:ss')}`
      return publishEmail(email, {topic: `SG - ${deviceName.toUpperCase()} is online`, message})
    })
  )

  return true
}

export async function sgOfflineEvent(event, {sgUserDevice, sgUser, sgDevice}) {
  if (_.isNil(event.mid)) {
    return null
  }

  const {mid} = event
  const owners = await sgUserDevice.find({mid}, {limit: 100})
  await Promise.all(
    owners.map(async ({user}) => {
      const _user = await sgUser.findOne(user)
      const _device = await sgDevice.findOneByMid(mid)

      if(_.isNil(_user) || _.isNil(_device)) {
        return false
      }

      const email = _.get(_user, 'profile.email')
      const deviceName = _.get(_device, 'profile.name')

      if (_.isNil(email)) {
        return false
      }

      const message = `Information message: Sending from ${deviceName}, SG is offline, ${moment().format('MMMM Do YYYY, HH:mm:ss')}`
      return publishEmail(email, {topic: `SG - ${deviceName.toUpperCase()} is OFFLINE`, message})
    })
  )

  return true
}


