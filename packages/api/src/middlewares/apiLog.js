const jwtDecode = require("jwt-decode");

const { ApiLog } = require("../models/ApiLog");

module.exports = async (req, res, next) => {
  const {
    headers: { authorization },
    method,
    originalUrl,
    params,
  } = req;
  const token = authorization ? authorization.slice(7, -1) : "";

  let decodedToken;

  try {
    decodedToken = jwtDecode(token);
  } catch (error) {
    decodedToken = null;
  }

  if (decodedToken) {
    const { editorId } = token;
    const tempSend = res.send;

    res.send = async function asyncSend(response) {
      await ApiLog.query().insert({
        editor_id: editorId,
        request_url: originalUrl,
        request_method: method,
        request_params: params,
        response,
        token,
      });

      tempSend.call(this, response);
    };
  } else {
    await ApiLog.query().insert({
      request_url: originalUrl,
      request_method: method,
      request_params: params,
      token,
    });
  }

  next();
};
