const express = require("express");
const router = express.Router();

const test = require("../../src/controllers/editor");

router.get("/test", test);

module.exports = router;
