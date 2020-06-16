const sentry = require("../utils/sentry");
const logger = require("../utils/logger");
const { sendEmail } = require(".");

const EMAIL_EDITOR_ADMIN_CONFIRMATION = (email, name) =>
  `Bonjour la super team emjpm :) ,

Nous avons reçu une nouvelle demande d'accès à l'api e-MJPM pour les éditeurs de logiciel métier à destination des mandataires et des services de mandataire.

avec le mail suivant: ${email}
avec le nom suivant: ${name}

  Veuillez prendre en compte cette demain au plus vite et vérifier si cet email correspond bien à un éditeur.

À bientôt

L’équipe e-mjpm.`;

const editorConfirmationAdminEmail = async (email, name) => {
  try {
    await sendEmail(
      "support.emjpm@fabrique.social.gouv.fr",
      "e-MJPM : confirmation de la demande d'accès à l'api e-MJPM",
      EMAIL_EDITOR_ADMIN_CONFIRMATION(email, name)
    );
  } catch (error) {
    sentry.captureException(error);
    logger.error(error);
  }
};

module.exports = {
  editorConfirmationAdminEmail,
};
