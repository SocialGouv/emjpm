const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const createError = require("http-errors");
const { User } = require("../../model/User");

/**
 * Reset password using username, password, new_password and new_password_confirmation return ok
 */
const resetPasswordWithToken = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors });
  }

  const { token, new_password } = req.body;
  const salt = bcrypt.genSaltSync();
  const newPasswordHash = bcrypt.hashSync(new_password, salt);

  User.query()
    .where({ reset_password_token: token })
    .andWhere("reset_password_expires", ">", "now()")
    .first()
    .catch(err => {
      return res.status(419).json({
        errors: {
          msg: "Votre lien de réinitialisation à expiré",
          location: "body",
          error: err
        }
      });
    })
    .then(async function(user) {
      if (!user) {
        throw createError.Unauthorized(
          "Votre lien de réinitialisation à expiré"
        );
      }
      try {
        await User.query()
          .where("id", user.id)
          .update({
            password: newPasswordHash,
            reset_password_token: null,
            reset_password_expires: null
          });
        return res.status(200).json({ status: "ok" });
      } catch (err) {
        return res.status(400).json({ err });
      }
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

module.exports = resetPasswordWithToken;
