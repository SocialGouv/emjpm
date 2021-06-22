const passport = require("~/auth/auth-passport");
const { validationResult } = require("express-validator");
const { User, ImpersonateLog } = require("~/models");

const impersonate = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors });
  }

  passport.authenticate(
    "login-impersonate",
    async (err, isAdmin, jwtPayload) => {
      if (err) {
        return res.status(401).json({
          errors: {
            error: err,
            location: "body",
            msg: "Vos informations de connexion sont erronées",
          },
        });
      }
      if (!isAdmin) {
        return res.status(403).json({ error: "Forbidden" });
      }
      let user;
      let error;
      try {
        user = await User.query()
          .findById(req.body.id)
          .withGraphFetched("[roles, service, direction, mandataire]");
      } catch (e) {
        error = e;
      }
      if (error) {
        return res.status(400).json({ error });
      }
      const userResult = await user.getUser();

      if (user.type === "admin") {
        return res.status(403).json({ error: "Forbidden" });
      }

      await ImpersonateLog.query().insert({
        admin_user_id: jwtPayload.id,
        user_id: user.id,
      });

      return res.status(200).json(userResult);
    }
  )(req, res, next);
};

module.exports = impersonate;
