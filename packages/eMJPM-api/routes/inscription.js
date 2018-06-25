const express = require("express");
const router = express.Router();
const queries = require("../db/queries/inscription");

router.get("/tis", (req, res, next) => {
  return queries.getTiByRegion().then(data => res.json(data));
});

module.exports = router;
