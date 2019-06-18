import getContext from '../getContext'
import withMiddleware from './withMiddlewares'

async function insertSgContext(event, context, next) {
  context.callbackWaitsForEmptyEventLoop = false;
  const sgContext = await getContext()
  context = {
    ...context,
    ...sgContext
  }
  return next(event, context)
}

export default function prepareHandler(handlers) {
  const handlerKeys = Object.keys(handlers)
  return handlerKeys.map(k => ({
    [k]: withMiddleware(handlers[k], [insertSgContext])
  }))
    .reduce( (prev, curr) => ({...prev, ...curr}))
}

