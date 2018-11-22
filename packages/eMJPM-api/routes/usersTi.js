var express = require("express");
var router = express.Router();

const { loginRequired, typeRequired } = require("../auth/_helpers");
const { getTiByUserIdWithCodePostal } = require("../db/queries/tis");

/** @swagger
 * /usersTi
 *   get:
 *     tags:
 *       - tis
 *     description: get ti information
 *     produces:
 *       - application/json
 */

router.get("/", loginRequired, typeRequired("ti"), async (req, res, next) => {
  if (req.user.type !== "ti") {
    return next(new Error(401));
  }
  getTiByUserIdWithCodePostal(req.user.id)
    .then(function(ti) {
      res.status(200).json(ti);
    })
    .catch(function(error) {
      throw error;
    });
});

module.exports = router;
