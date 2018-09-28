const { sendEmail } = require("../email");

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

const confirmationPasswordEmail = mandataire => {
  sendEmail(
    mandataire.email,
    "Confirmation du mot de passe",
    EMAIL_RELANCE_TEXT,
    EMAIL_RELANCE_HTML
  ).catch(e => {
    // todo: sentry
    console.log(e);
  });
};

module.exports = {
  confirmationPasswordEmail
};
