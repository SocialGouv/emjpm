const express = require("express");
const bcrypt = require("bcryptjs");
const generator = require("generate-password");

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

router.post("/reset-password", async (req, res) => {
  const { id } = req.body.input;

  const user = await User.query().findOne("id", id);

  if (!user) {
    return res.json({
      error: "user not found",
    });
  }

  if (user.type === "admin") {
    return res.status(403).json({
      error: "Forbidden",
      message: "reset admin password not allowed",
    });
  }

  const password = generator.generate({
    length: 10,
    lowercase: true,
    numbers: true,
    strict: true,
    uppercase: true,
  });

  const salt = bcrypt.genSaltSync();
  const newPasswordHash = bcrypt.hashSync(password, salt);

  let err;
  try {
    await User.query().where("id", id).update({ password: newPasswordHash });
  } catch (e) {
    err = e;
  }
  if (err) {
    return res.status(400).json({ err });
  }
  return res.json({ password });
});

module.exports = router;
