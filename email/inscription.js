const { sendEmail } = require(".");

const EMAIL_RELANCE_TEXT = `
Bonjour la super team emjpm :) ,

Nous avons reçu une nouvelle inscription.

Bonne journée :)
`;

const EMAIL_RELANCE_HTML = `
Bonjour la super team eMJPM :),<br>
<br>
Nous avons reçu une nouvelle inscription.
<br><br><br>
Bonne journée :)
`;

const inscriptionEmail = () =>
  sendEmail(
    "contact@emjpm.beta.gouv.fr",
    "Nouvelle inscription",
    EMAIL_RELANCE_TEXT,
    EMAIL_RELANCE_HTML
  ).catch(e => {
    // todo: sentry
    console.log(e);
  });

module.exports = {
  inscriptionEmail
};
