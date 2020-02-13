const jwtDecode = require("jwt-decode");

const { ApiLog } = require("../model/ApiLog");

module.exports = (req, res, next) => {
  const {
    headers: { authorization },
    protocol,
    host,
    method,
    originalUrl,
    params,
    query
  } = req;
  const token = authorization ? authorization.slice(7, -1) : null;
  const { editorId } = jwtDecode(token);
  const tempSend = res.send;

  res.send = async function asyncSend(response) {
    const request = {
      url: originalUrl,
      method,
      params,
      query,
      protocol,
      host
    };

    await ApiLog.query().insert({
      editor_id: editorId,
      request,
      response,
      token
    });

    tempSend.call(this, response);
  };

  next();
};
