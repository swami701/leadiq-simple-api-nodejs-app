function setContentLength(res, length) {
  if (res.getHeader('Content-Length') === undefined &&
    res.contentLength === undefined) {
    res.setHeader('Content-Length', length);
  }
}

let resp = (req, res, body) => {
  if (!body) {
    setContentLength(res, 0);
    return null;
  }

  if (body instanceof Error) {
    // snoop for RestError or HttpError, but don't rely on instanceof
    if ((body.restCode || body.httpCode) && body.body) {
      body = body.body;
    } else {
      body = {
        message: body.message
      };
    }
  }

  if (Buffer.isBuffer(body))
    body = body.toString('base64');

  var data = JSON.stringify({
    status: res.statusCode,
    message: (res.statusCode >= 200 && res.statusCode < 300) ? 'Success' : 'Fail',
    result: body
  });

  setContentLength(res, Buffer.byteLength(data));

  return data
}

module.exports = resp;