const express = require("express");

const { User } = require("~/models");

const router = express.Router();

router.post("/check-email-exists", async (req, res) => {
  const { email } = req.body.input;

  const users = await User.query().where({ email });

  // success
  return res.json({
    exist: users.length > 0,
  });
});

module.exports = router;
