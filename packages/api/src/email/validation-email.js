const { sendEmail } = require(".");

const EMAIL_RELANCE_TEXT = url => `
Bonjour,

eMJPM vient de valider votre compte.

Vous pouvez l'utiliser.

Veuillez cliquer sur le lien suivant: ${url}

Bien à vous.

eMJPM Team
`;

const EMAIL_RELANCE_HTML = url => `
Bonjour,<br>
<br>
eMJPM vient de valider votre compte.
<br>
Vous pouvez l'utiliser.

Veuillez cliquer sur le lien suivant: <a href=${url}>Se connecter</a>
<br><br><br>
Bien à vous.
<br><br><br>
eMJPM Team
`;

const validationEmail = (email, url) => {
  sendEmail(
    email,
    "Validation du compte",
    EMAIL_RELANCE_TEXT(url),
    EMAIL_RELANCE_HTML(url)
  ).catch(e => {
    // todo: sentry
    /* eslint-disable no-console */
    console.log(e);
    /* eslint-enable no-console */
  });
};

module.exports = {
  validationEmail
};
