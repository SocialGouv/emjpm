const express = require("express");

const { sendEmail } = require("../email");
const router = express.Router();

router.get("/test", function(req, res) {
  sendEmail(
    "contact@emjpm.beta.gouv.fr",
    "e-MJPM : test",
    "Bonjour !",
    "Bonjour !"
  );
  res.json({ success: true });
});

module.exports = {
  router
};
