const express = require("express");
const {
  editorConfirmationEmail,
} = require("../../email/editor-confirmation-email");
const {
  editorConfirmationAdminEmail,
} = require("../../email/editor-confirmation-admin-email");

// ----------------------------------
// -------EMAIL ACCOUNT VALIDATION---
// ----------------------------------

const router = express.Router();

router.post("/token-request", function (req, res) {
  const {
    body: {
      event: {
        data: {
          new: { email, name },
        },
      },
    },
  } = req;
  editorConfirmationEmail(email);
  editorConfirmationAdminEmail(email, name);
  res.json({ success: true });
});

module.exports = router;
