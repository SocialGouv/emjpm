const { sendEmail } = require(".");

const EMAIL_RELANCE_TEXT = (nom, prenom, email) => `
Bonjour la super team emjpm :) ,

Nous avons reçu une nouvelle inscription de ${prenom} / ${nom}  ${email}.

Merci de vérifier cette nouvelle demande et de la valider.

Bonne journée :)
`;

const EMAIL_RELANCE_HTML = (nom, prenom, email) => `
Bonjour la super team eMJPM :),<br />
Nous avons reçu une nouvelle inscription de ${prenom} / ${nom}  ${email} <br />
Merci de vérifier cette nouvelle demande et de la valider.
<br /><br />
Bonne journée :)
`;

const inscriptionEmail = ({ nom, prenom, email }) =>
  sendEmail(
    "contact@emjpm.beta.gouv.fr",
    "Nouvelle inscription",
    EMAIL_RELANCE_TEXT(nom, prenom, email),
    EMAIL_RELANCE_HTML(nom, prenom, email)
  ).catch(e => {
    // todo: sentry
    console.log(e);
  });

module.exports = {
  inscriptionEmail
};
