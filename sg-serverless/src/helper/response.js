const buildResponse = (statusCode, headers, body) => {

  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      ...headers,
    },
    body: JSON.stringify(body),
  }
}


export default {
  success: body => buildResponse(200, {}, body),
  badRequest: body => buildResponse(400, {}, body),
  notFound: body => buildResponse(404, {}, body),
  failure: body => buildResponse(500, {}, body),
  redirect: (headers) => buildResponse(301, headers, {})
}
