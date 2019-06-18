import connection from '../../datasource/mongo'
import SmsNotification from './model/SmsNotification'
export default function getContext() {
  const sgSmsNotification = new SmsNotification(connection)
  return {
    sgSmsNotification
  }
}
