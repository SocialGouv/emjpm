const fs = require("fs");

const { ApiLog, AccessToken } = require("~/models");

module.exports = async (req, res, next) => {
  const {
    headers: { authorization },
    method,
    originalUrl,
    params,
  } = req;

  const token = authorization ? authorization.slice(7) : "";

  let editorId;
  if (token) {
    const accessToken = await AccessToken.query().findOne({
      access_token: token,
    });
    editorId = accessToken?.editor_id || null;
    fs.writeFileSync(
      "/tmp/test-emjpm.log",
      JSON.stringify({ editorId, token })
    );
  }

  if (editorId) {
    const tempSend = res.send;

    res.send = async function asyncSend(response) {
      await ApiLog.query().insert({
        editor_id: editorId,
        request_method: method,
        request_params: params,
        request_url: originalUrl,
        response,
        token,
      });

      tempSend.call(this, response);
    };
  } else {
    await ApiLog.query().insert({
      request_method: method,
      request_params: params,
      request_url: originalUrl,
      token,
    });
  }

  next();
};
