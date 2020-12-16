const logger = require("~/utils/logger");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { confirmationPasswordEmail } = require("~/email/password-confirmation");
const { User } = require("~/models/User");

/**
 * Reset password using username, password, new_password and new_password_confirmation return ok
 */
const resetPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors });
  }

  const { username, password, new_password } = req.body;
  const salt = bcrypt.genSaltSync();
  const newPasswordHash = bcrypt.hashSync(new_password, salt);

  try {
    const user = await User.query()
      .where("username", username)
      .orWhere("email", username.toLowerCase().trim())
      .first();
    user.verifyPassword(password, async function (err, passwordCorrect) {
      if (err) {
        logger.error(err);
        return res.status(400).json({
          errors: {
            location: "body",
            msg: "Une erreur est survenue",
          },
        });
      }
      if (!passwordCorrect) {
        return res.status(401).json({
          errors: {
            location: "body",
            msg: "votre mot de passe actuel n'est pas le bon",
            param: "password",
          },
        });
      }
      try {
        await User.query()
          .where("id", user.id)
          .update({ password: newPasswordHash });
        res.status(200).json({ status: "ok" });
        return confirmationPasswordEmail(user.email);
      } catch (err) {
        logger.error(err);
        return res.status(400).json({ err });
      }
    });
  } catch (err) {
    logger.error(err);
    return res.status(400).json({
      errors: {
        error: err,
        location: "body",
        msg: "Une erreur est survenue",
      },
    });
  }
};

module.exports = resetPassword;
