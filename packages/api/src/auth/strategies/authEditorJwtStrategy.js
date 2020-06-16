const jwtDecode = require("jwt-decode");
const passportBearer = require("passport-http-bearer");

const { AccessToken } = require("../../models/AccessToken");

const BearerStrategy = passportBearer.Strategy;

const authEditorJwtStrategy = new BearerStrategy(async function (token, done) {
  try {
    const decoded = jwtDecode(token);

    const accessToken = decoded.uid;
    const userId = decoded.userId;
    const editorId = decoded.editorId;
    try {
      const currentClient = await AccessToken.query()
        .where("access_token", accessToken)
        .first();
      if (
        currentClient.user_id === userId &&
        currentClient.editor_id === parseInt(editorId)
      ) {
        return done(null, currentClient, { scope: "all" });
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(null, false);
    }
  } catch (error) {
    return done(null, false);
  }
});

module.exports = authEditorJwtStrategy;
