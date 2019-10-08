const express = require("express");

const { sendEmail } = require("../email");
const router = express.Router();

router.post("/mesure-reservation", function(req, res) {
  // eslint-disable-next-line no-console
  console.log(req.body.event.data);
  sendEmail(
    "support.emjpm@fabrique.social.gouv.fr",
    "e-MJPM : test",
    "Bonjour ! Adrien",
    "Bonjour ! Adrien"
  );
  res.json({ success: true });
});

module.exports = router;
