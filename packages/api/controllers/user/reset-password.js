const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { User } = require("../../model/User");

/**
 * Reset password using username, password, new_password and new_password_confirmation return ok
 */
const postResetPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors });
  }

  const { username, password, new_password } = req.body;
  const salt = bcrypt.genSaltSync();
  const newPasswordHash = bcrypt.hashSync(new_password, salt);

  User.query()
    .where("username", username)
    .orWhere("email", username.toLowerCase().trim())
    .first()
    .then(function(user) {
      user.verifyPassword(password, async function(err, passwordCorrect) {
        if (err) {
          return res.status(400).json({
            errors: {
              msg: "Une erreur est survenue",
              location: "body",
              error: err
            }
          });
        }
        if (!passwordCorrect) {
          return res.status(401).json({
            errors: {
              param: "password",
              msg: "votre mot de passe actuel n'est pas le bon",
              location: "body"
            }
          });
        }
        try {
          await User.query()
            .where("id", user.id)
            .update({ password: newPasswordHash });
          return res.status(200).json({ status: "ok" });
        } catch (err) {
          return res.status(400).json({ err });
        }
      });
    })
    .catch(function(err) {
      return res.status(400).json({
        errors: {
          msg: "Une erreur est survenue",
          location: "body",
          error: err
        }
      });
    });
};

module.exports = postResetPassword;
