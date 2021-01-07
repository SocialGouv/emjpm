const passport = require("~/auth/auth-passport");
const { validationResult } = require("express-validator");
const { User, Logs } = require("~/models");

/**
 * Sign in using username and password and returns JWT
 */
const login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors });
  }

  passport.authenticate("login-password", async (err, user) => {
    if (err) {
      return res.status(401).json({
        errors: {
          error: err,
          location: "body",
          msg: "Vos informations de connexion sont erronées",
        },
      });
    }
    if (user) {
      await User.query()
        .where("id", user.id)
        .update({ last_login: new Date().toISOString() });

      await Logs.query().insert({
        action: "connexion",
        result: "success",
        user_id: user.id,
      });

      const userResult = await user.getUser();

      return res
        .cookie("token", userResult.token, {
          httpOnly: true,
          secure: req.secure,
        })
        .status(200)
        .json(userResult);
    }
  })(req, res, next);
};

module.exports = login;
