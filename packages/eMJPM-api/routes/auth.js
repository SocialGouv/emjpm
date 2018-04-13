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
  console.log(req.body)
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
        console.log(user.mandataire)
        if (user.mandataire === true){
        return handleResponse(res, 200,"success" ,"/mandataires_index");
        } else {
        return handleResponse(res, 200, "success" , "/tis" );
        }
      });
    }
  })(req, res, next);
});

router.get("/logout", authHelpers.loginRequired, (req, res, next) => {
  req.logout();
  handleResponse(res, 200, "success");
});

function handleResponse(res, code, statusMsg ,url) {
  res.status(code).json({ status: statusMsg ,url: url });
}

module.exports = router;
