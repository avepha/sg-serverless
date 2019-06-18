import connection from '../../datasource/mongo'
import UserDevice from './model/UserDeivce'
import Device from './model/Device'

export default function getContext() {
  const sgUserDevice = new UserDevice(connection)
  const sgDevice = new Device(connection)
  return {
    sgUserDevice,
    sgDevice
  }
}
