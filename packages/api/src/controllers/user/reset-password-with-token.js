const logger = require("~/utils/logger");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const createError = require("http-errors");
const { User } = require("~/models/User");
const { confirmationPasswordEmail } = require("~/email/password-confirmation");

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

  try {
    const user = await User.query()
      .where({ reset_password_token: token })
      .andWhere("reset_password_expires", ">", "now()")
      .first();
    if (!user) {
      throw createError.Unauthorized("Votre lien de réinitialisation a expiré");
    }
    try {
      await User.query().where("id", user.id).update({
        password: newPasswordHash,
        reset_password_expires: null,
        reset_password_token: null,
      });
      res.status(200).json({ status: "ok" });
      return confirmationPasswordEmail(user.email);
    } catch (err) {
      logger.error(err);
      return res.status(400).json({ err });
    }
  } catch (err) {
    return res.status(419).json({
      errors: {
        error: err,
        location: "body",
        msg: "Votre lien de réinitialisation a expiré",
      },
    });
  }
};

module.exports = resetPasswordWithToken;
