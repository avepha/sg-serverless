import ChannelLogger from './model/ChannelLogger'
import connection from '../../datasource/mongo'

export default async function getContext() {
  const sgChannelLogger = await new ChannelLogger(connection)
  return {
    sgChannelLogger,
  }
}
