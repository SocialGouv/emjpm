const { sendEmail } = require(".");

const EMAIL_RELANCE_TEXT = `
Bonjour,

Votre nouveau mot de passe a bien été enregistré.

Bien à vous.
`;

const EMAIL_RELANCE_HTML = `
Bonjour,<br>
<br>
Votre nouveau mot de passe a bien été enregistré.
<br><br><br>
Bien à vous.
`;

const confirmationPasswordEmail = email =>
  sendEmail(
    email,
    "Confirmation du mot de passe",
    EMAIL_RELANCE_TEXT,
    EMAIL_RELANCE_HTML
  );

module.exports = {
  confirmationPasswordEmail
};
