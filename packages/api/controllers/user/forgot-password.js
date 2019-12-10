const { validationResult } = require("express-validator");
const { resetPasswordEmail } = require("../../email/forgot-password-email");
const createError = require("http-errors");
const { User } = require("../../model/User");
const uid = require("rand-token").uid;

/**
 * Forgot password using email return ok
 */

const forgotPassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors });
  }

  const email = req.body.email;
  const token = uid(16);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  try {
    const user = await User.query()
      .where("email", email.toLowerCase().trim())
      .first();
    if (!user) {
      return next(
        createError.NotFound(`Aucun utilisateur avec l'email "${email}"`)
      );
    }
    await User.query()
      .where("id", user.id)
      .update({
        reset_password_token: token,
        reset_password_expires: tomorrow
      });
    resetPasswordEmail(
      user,
      email,
      `${process.env.APP_URL}/account/reset-password?token=${token}`
    );
    return res.status(200).json();
  } catch (err) {
    return res.status(400).json({
      errors: {
        msg: "Une erreur est survenue",
        location: "body",
        error: err
      }
    });
  }
};

module.exports = forgotPassword;
