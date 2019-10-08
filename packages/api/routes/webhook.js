const express = require("express");

const { sendEmail } = require("../email");
const router = express.Router();

router.get("/mesure-reservation", function(req, res) {
  // eslint-disable-next-line no-console
  console.log(req);
  sendEmail(
    "support.emjpm@fabrique.social.gouv.fr",
    "e-MJPM : test",
    "Bonjour !",
    "Bonjour !"
  );
  res.json({ success: true });
});

module.exports = router;
