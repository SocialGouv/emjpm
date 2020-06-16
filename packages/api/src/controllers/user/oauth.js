const logger = require("../../utils/logger");
const { AccessToken } = require("../../models/AccessToken");
const jwtConfig = require("../../config/jwt");
const jwt = require("jsonwebtoken");
const getUid = require("../../utils/getUid");
const { validationResult } = require("express-validator");
const { Editors } = require("../../models/Editors");

const generateToken = (editorId, editorToken, redirectUrl, userId, uid) => {
  const signOptions = {
    subject: uid,
    algorithm: "RS256",
  };
  const claim = {
    url: redirectUrl,
    uid: uid,
    userId: userId,
    editorId: editorId,
    editorToken: editorToken,
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

  const { editorId, editorToken, redirectUrl, userId } = req.body;

  try {
    const editorApiToken = await Editors.query().where("id", editorId).first();
    if (editorApiToken.api_token !== editorToken) {
      return res.status(400).json({ errorMsg: "Identifiants editeur inconnu" });
    }
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ errorMsg: "Identifiants editeur inconnu" });
  }

  try {
    await AccessToken.query().insert({
      user_id: userId,
      editor_id: editorId,
      editor_url: redirectUrl,
      access_token: uid,
    });
  } catch (error) {
    logger.error(error);
  }

  // This is the public key we'll decode later when an app make a request on our api's
  const publicToken = generateToken(
    editorId,
    editorToken,
    redirectUrl,
    userId,
    uid
  );

  res.status(200).json({ publicToken, redirectUrl });
};

module.exports = authorize;
