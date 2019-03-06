const { sendEmail } = require(".");

const EMAIL_RELANCE_TEXT = url => `
Bonjour la super team emjpm :) ,

Nous avons reçu une nouvelle inscription.

Veuillez cliquer sur le lien suivant: ${url}

Bonne journée :)
`;

const EMAIL_RELANCE_HTML = url => `
Bonjour la super team eMJPM :),<br>
<br>
Nous avons reçu une nouvelle inscription.
<br>
Veuillez cliquer sur le lien suivant: <a href=${url}>Se connecter</a>
<br><br>
Bonne journée :)
`;

const inscriptionEmail = url =>
  sendEmail(
    "contact@emjpm.beta.gouv.fr",
    "Nouvelle inscription",
    EMAIL_RELANCE_TEXT(url),
    EMAIL_RELANCE_HTML(url)
  );

module.exports = {
  inscriptionEmail
};
