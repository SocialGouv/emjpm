const express = require("express");
const router = express.Router();

const routes = require("../../src/controllers/editor");

router.get("/test", routes.test);
router.get("/mesures", routes.mesures);

module.exports = router;
