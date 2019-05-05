export default function withMiddlewares(handler, middlewares = []){
  return (event, context, callback) => {
    const chainMiddlewares = ([firstMiddleware, ...restOfMiddlewares]) => {
      if (firstMiddleware) {
        return (e, c) => {
          try {
            return firstMiddleware(e, c, chainMiddlewares(restOfMiddlewares))
          } catch (error) {
            return Promise.reject(error)
          }
        }
      }

      return handler
    }

    chainMiddlewares(middlewares)(event, context)
      .then(async result => await callback(null, result))
      .catch(async (err) => {
        await callback(err, null)
      })
  }
}
