const { sendEmail } = require(".");

const EMAIL_RELANCE_TEXT = `
Bonjour,

eMJPM vient de valider votre compte.

Vous pouvez l'utiliser.

Bien à vous.

eMJPM Team
`;

const EMAIL_RELANCE_HTML = `
Bonjour,<br>
<br>
eMJPM vient de valider votre compte.
<br>
Vous pouvez l'utiliser.

<br><br><br>
Bien à vous.
<br><br><br>
eMJPM Team
`;

const validationEmail = email => {
  sendEmail(
    email,
    "Validation du compte",
    EMAIL_RELANCE_TEXT,
    EMAIL_RELANCE_HTML
  ).catch(e => {
    // todo: sentry
    console.log(e);
  });
};

module.exports = {
  validationEmail
};
