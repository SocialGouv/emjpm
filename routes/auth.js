const express = require("express");
const router = express.Router();

const authHelpers = require("../auth/_helpers");
const passport = require("../auth/local");

// router.post("/register", authHelpers.loginRedirect, (req, res, next) => {
//   return authHelpers
//     .createUser(req, res)
//     .then(response => {
//       passport.authenticate("local", (err, user, info) => {
//         if (user) {
//           return handleResponse(res, 200, "success");
//         }
//       })(req, res, next);
//     })
//     .catch(err => {
//       return handleResponse(res, 500, "error");
//     });
// });

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
        if (user.type === "individuel" || user.type === "prepose") {
          return handleResponse(res, 200, "success", "/mandataires_index");
        } else if (user.type === "service") {
          return handleResponse(res, 200, "success", "/services");
        } else if (user.type === "ti") {
          return handleResponse(res, 200, "success", "/tis");
        } else if (user.type === "admin") {
          return handleResponse(res, 200, "success", "/admin");
        }
      });
    }
  })(req, res, next);
});

router.get("/logout", authHelpers.loginRequired, (req, res, next) => {
  req.logout();
  console.log(handleResponse(res, 200, "success"));
  handleResponse(res, 200, "success");
});

function handleResponse(res, code, statusMsg, url) {
  res.status(code).json({ status: statusMsg, url: url });
}

module.exports = router;
