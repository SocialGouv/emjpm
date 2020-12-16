const express = require("express");
const { getUser } = require("~/controllers/mandoline/user");

const router = express.Router();

router.get("/user", getUser);

module.exports = router;
