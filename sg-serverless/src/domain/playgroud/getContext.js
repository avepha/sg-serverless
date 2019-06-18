import connection from '../../datasource/mongo'
import Playground from './model/Playground'

export default async function getContext() {
  const sgPlayground = await new Playground(connection)

  return {
    sgPlayground
  }
}
