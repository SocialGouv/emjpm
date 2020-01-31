// const passport = require("../../auth/local");
// const { validationResult } = require("express-validator");
// const { User } = require("../../model/User");
// const { Logs } = require("../../model/Logs");
const { getUid } = require("../../utils");
const { validationResult } = require("express-validator");

// Ask for authorization
const authorize = async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  const test = getUid(256);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors });
  }
  // we should get :
  // - editor URL
  // - editor token
  // - user id
  // -
  // we should fill in table :
  // - authorization
  // - editor token and id
  // - user id
  // - user token
  res.status(200).json(test);
};

module.exports = authorize;
