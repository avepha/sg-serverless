import User from './model/User'
import connection from '../../datasource/mongo'
export default function getContext() {
  const sgUser = new User(connection)
  return {
    sgUser
  }
}
