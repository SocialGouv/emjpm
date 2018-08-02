const express = require("express");
const router = express.Router();

const authHelpers = require("../auth/_helpers");
const passport = require("../auth/local");

const { updateLastLogin } = require("../db/queries/users");

const redirs = {
  individuel: "/mandataires",
  prepose: "/mandataires",
  service: "/services",
  ti: "/tis",
  admin: "/admin",
  default: "/"
};

router.post("/login", authHelpers.loginRedirect, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return handleResponse(res, 401, "User not found");
    }
    if (user) {
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        updateLastLogin(user.id).then(() => {
          return handleResponse(
            res,
            200,
            "success",
            redirs[user.type] || redirs.default
          );
        });
      });
    }
  })(req, res, next);
});

router.get("/logout", (req, res, next) => {
  req.logout();
  handleResponse(res, 200, "success");
  next();
});

function handleResponse(res, code, statusMsg, url) {
  res.status(code).json({ status: statusMsg, url: url });
}

module.exports = router;
