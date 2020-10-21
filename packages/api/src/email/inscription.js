const sentry = require("../utils/sentry");
const logger = require("../utils/logger");
const { sendEmail } = require(".");

const EMAIL_RELANCE_TEXT = (nom, prenom, email, codePostal, type) => `
Bonjour la super team emjpm :) ,

Nous avons reçu une nouvelle inscription pour un utilisateur:
- type: ${type}
- nom: ${prenom} ${nom}
- email: ${email}
- code postal: ${codePostal}

Merci de vérifier cette nouvelle demande et de la valider.

Bonne journée :)
`;

const EMAIL_RELANCE_HTML = (nom, prenom, email, codePostal, type, tis) => `
Bonjour la super team eMJPM :),<br />
Nous avons reçu une nouvelle inscription pour un utilisateur:<br />
- type: ${type} <br />
- nom: ${prenom} ${nom} <br />
- email: ${email} <br />
- code postal: ${codePostal} <br /><br />

Merci de vérifier cette nouvelle demande et de la valider.
<br /><br />
Bonne journée :)
`;

const inscriptionEmail = async (nom, prenom, email, codePostal, type, tis) => {
  try {
    await sendEmail(
      "support.emjpm@fabrique.social.gouv.fr",
      "Nouvelle inscription",
      EMAIL_RELANCE_TEXT(nom, prenom, email, codePostal, type, tis),
      EMAIL_RELANCE_HTML(nom, prenom, email, codePostal, type, tis)
    );
  } catch (error) {
    sentry.captureException(error);
    logger.error(error);
  }
};

module.exports = {
  inscriptionEmail,
};
