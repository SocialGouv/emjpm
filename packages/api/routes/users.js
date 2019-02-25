const express = require("express");
const router = express.Router();
//const queries = require("../db/queries");

const authHelpers = require("../auth/_helpers");
const { getSpecificUser, updateUser } = require("../db/queries/users");

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

router.get("/", authHelpers.loginRequired, (req, res, next) => {
  return handleResponse(res, 200, "success");
});

// router.get("/admin", authHelpers.adminRequired, (req, res, next) => {
//   return handleResponse(res, 200, "success");
// });

function handleResponse(res, code, statusMsg) {
  res.status(code).json({ status: statusMsg });
}
const WHITELIST = ["nom", "prenom", "email", "cabinet", "type"];

const whiteList = obj =>
  Object.keys(obj)
    .filter(key => WHITELIST.indexOf(key) > -1)
    .reduce((a, c) => ({ ...a, [c]: obj[c] }), {});

router.put(
  "/1",
  authHelpers.typeRequired("ti"),
  authHelpers.loginRequired,
  async (req, res, next) => {
    const { nom, prenom, email, cabinet, type } = req.body;

    const user = await getSpecificUser({ id: req.user.id });
    if (!user) {
      return next(new Error(401));
    }
    const body = whiteList(req.body);

    if (Object.keys(body).length === 0) {
      res.status(200).json(user);
      return next();
    }

    updateUser(req.user.id, {
      nom,
      prenom,
      email,
      type,
      cabinet
    })
      .then(() => getSpecificUser({ id: req.user.id }))
      .then(user => {
        res.status(200).json(user);
      })
      .catch(error => {
        console.log(error);
        throw error;
        next(error);
      });
  }
);

router.get(
  "/1",
  authHelpers.loginRequired,
  authHelpers.typeRequired("ti"),
  async (req, res, next) => {
    const user = await getSpecificUser({ id: req.user.id });
    if (!user) {
      return next(new Error(401));
    }
    res.status(200).json(user);
  }
);

module.exports = router;
