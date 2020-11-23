const { validationResult } = require("express-validator");
const { endOfTomorrow } = require("date-fns");
const uid = require("rand-token").uid;
const Sentry = require("../../utils/sentry");

const { resetPasswordEmail } = require("../../email/forgot-password-email");
const { User } = require("../../models/User");

const APP_URL = process.env.APP_URL || "localhost:3000";

const forgotPassword = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors });
  }

  const email = req.body.email.toLowerCase().trim();
  const token = uid(16);
  let user;

  try {
    user = await User.query().findOne({ email });
  } catch (error) {
    Sentry.captureException(error);
    return res.status(422).json({ error: "Une erreur est survenue" });
  }

  if (!user) {
    return res
      .status(422)
      .json({ error: `Aucun utilisateur avec l'email "${email}"` });
  }

  try {
    await User.query().where("id", user.id).update({
      reset_password_expires: endOfTomorrow(),
      reset_password_token: token,
    });
  } catch (error) {
    Sentry.captureException(error);
    return res.status(422).json({ error: "Une erreur est survenue" });
  }

  try {
    resetPasswordEmail(
      user,
      email,
      `${APP_URL}/account/reset-password?token=${token}`
    );
  } catch (error) {
    Sentry.captureException(error);
    return res.status(422).json({ error: "Une erreur est survenue" });
  }

  res.status(200).json({});
};

module.exports = forgotPassword;
