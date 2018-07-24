const { typeRequired } = require("../auth/_helpers");

const express = require("express");

const router = express.Router();

const queries = require("../db/queries/admin");
const whitelist = require("../db/queries/whitelist");

router.get("/mandataires", typeRequired("admin"), async (req, res, next) => {
  const mandataires = await queries.getMandataires({ filters: req.query });
  res.json(mandataires);
});

const USER_WRITE_PROPERTIES = ["active"];

router.put("/user/:userId", typeRequired("admin"), async (req, res, next) => {
  // whitelist input data
  const cleanedBody = whitelist(req.body, USER_WRITE_PROPERTIES);
  await queries
    .updateUser({
      id: req.params.userId,
      ...cleanedBody
    })
    .then(updated => {
      res.json({
        success: !!updated
      });
    });
});

module.exports = router;
