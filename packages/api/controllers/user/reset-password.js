const passport = require("../../auth/local");
const { validationResult } = require("express-validator");
const { User } = require("../../model/User");

/**
 * Sign in using username and password and returns JWT
 */
const postResetPassword = async (req, res, next) => {
  const errors = validationResult(req);
  const newPassword = req.body.new_password;
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors });
  }

  passport.authenticate("local", async (err, user) => {
    if (err) {
      return res.status(401).json({ err });
    }
    if (user) {
      await User.query()
        .where("id", user.id)
        .update({ password: newPassword });
      return res.status(200).json("reset password ok");
    }
  })(req, res, next);
};

module.exports = postResetPassword;
