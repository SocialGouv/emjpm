const express = require("express");
const router = express.Router();
//const queries = require("../db/queries");

const authHelpers = require("../auth/_helpers");

// router.get("/index_users", function(req, res, next) {
//   queries
//     .getAllUsers()
//     .then(function(mandataires) {
//       res.status(200).json(mandataires);
//     })
//     .catch(function(error) {
//       next(error);
//     });
// });

router.get("/user", authHelpers.loginRequired, (req, res, next) => {
  return handleResponse(res, 200, "success");
});

// router.get("/admin", authHelpers.adminRequired, (req, res, next) => {
//   return handleResponse(res, 200, "success");
// });

function handleResponse(res, code, statusMsg) {
  res.status(code).json({ status: statusMsg });
}

module.exports = router;
