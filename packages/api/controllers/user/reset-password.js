const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { User } = require("../../model/User");

/**
 * Sign in using username and password and returns JWT
 */
const postResetPassword = async (req, res, next) => {
  const errors = validationResult(req);
  const { username, password, new_password } = req.body;

  const salt = bcrypt.genSaltSync();
  const newPasswordHash = bcrypt.hashSync(new_password, salt);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors });
  }

  User.query()
    .where("username", username)
    .orWhere("email", username.toLowerCase().trim())
    .first()
    .then(function(user) {
      user.verifyPassword(password, async function(err, passwordCorrect) {
        if (err) {
          return next(err);
        }
        if (!passwordCorrect) {
          return next("Invalid password");
        }
        try {
          await User.query()
            .where("id", user.id)
            .update({ password: newPasswordHash });
          return res.status(200).json(newPasswordHash);
        } catch (err) {
          return res.status(400).json({ err });
        }
      });
    })
    .catch(function(err) {
      next(err);
    });
};

module.exports = postResetPassword;
