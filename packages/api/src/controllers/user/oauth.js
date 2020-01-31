// const passport = require("../../auth/local");
// const { validationResult } = require("express-validator");
// const { User } = require("../../model/User");
// const { Logs } = require("../../model/Logs");
const { AccessToken } = require("../../model/AccessToken");
const jwtConfig = require("../../config/jwt");
const jwt = require("jsonwebtoken");
const { getUid } = require("./utils/uid");
const { validationResult } = require("express-validator");

const generateToken = (editorId, editorSecret, redirectUrl, userId, uid) => {
  const signOptions = {
    subject: uid,
    algorithm: "RS256"
  };
  const claim = {
    url: redirectUrl,
    uid: uid,
    userId: userId,
    editorId: editorId,
    editorSecret: editorSecret
  };
  return jwt.sign(claim, jwtConfig.key, signOptions);
};

// Ask for authorization
const authorize = async (req, res) => {
  const errors = validationResult(req);
  const uid = getUid(128);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors });
  }
  const { editorId, editorSecret, redirectUrl, userId } = req.body;

  try {
    await AccessToken.query().insert({
      user_id: userId,
      editor_id: editorId,
      editor_url: redirectUrl,
      access_token: uid
    });
  } catch (e) {
    console.log(e);
  }

  // This is the public key we'll decode later when an app make a request on our api's
  const publicToken = generateToken(
    editorId,
    editorSecret,
    redirectUrl,
    userId,
    uid
  );

  res.status(200).json({ publicToken: publicToken, redirectUrl: redirectUrl });
};

module.exports = authorize;
