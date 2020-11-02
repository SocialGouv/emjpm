const OAuthServer = require("express-oauth-server");
const model = require("./model");

module.exports = new OAuthServer({
  accessTokenLifetime: 60 * 60 * 24,
  grants: ["authorization_code", "refresh_token"],
  model: model, // 24 hours, or 1 day
});
