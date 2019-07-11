const passport = require("../../auth/local");
const { validationResult } = require("express-validator");
const { updateLastLogin } = require("../../db/queries/users");
const { addDataLogs } = require("../../db/queries/logsData");

/**
 * Sign in using username and password and returns JWT
 */
const postLogin = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors });
  }

  passport.authenticate("local", (err, user) => {
    if (err) {
      return res.status(401).json({ err });
    }
    if (user) {
      updateLastLogin(user.id).then(() => {
        addDataLogs({
          user_id: user.id,
          action: "connexion",
          result: "success"
        });
        return res.status(200).json(user.getUser());
      });
    }
  })(req, res, next);
};

module.exports = postLogin;
