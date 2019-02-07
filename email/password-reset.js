const { sendEmail } = require(".");

const EMAIL_RELANCE_TEXT = url => `
Bonjour,

Vous avez demandé le changement de mot de passe.


Veuillez cliquer sur le lien suivant: ${url}

Bien à vous.
`;

const EMAIL_RELANCE_HTML = (url, user) => `
Bonjour,<br>
<br>
Vous avez demandé le changement de mot de passe.
<br><br>
Votre identifiant est: ${user.email}

Veuillez cliquer sur le lien suivant: <a href=${url}>réinitialiser mon mot de passe</a>.
<br><br><br>
Bien à vous.
`;

const resetPasswordEmail = (user, email, url) => {
  return sendEmail(
    email,
    "Nouveau mot de passe pour e-MJPM",
    EMAIL_RELANCE_TEXT(url, user),
    EMAIL_RELANCE_HTML(url, user)
  ).catch(e => {
    // todo: sentry
    console.log(e);
  });
};

module.exports = {
  resetPasswordEmail
};
