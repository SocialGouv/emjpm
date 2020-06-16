const sentry = require("../utils/sentry");
const logger = require("../utils/logger");
const { sendEmail } = require(".");

const EMAIL_EDITOR_CONFIRMATION = () =>
  `Madame, Monsieur,

  Nous avons bien pris en compte votre demande d'accès à l'api e-mjpm des éditeurs de logiciel métier.
  Le délai de traitement des demandes est en moyenne de 2 jours ouvrés.

À bientôt

L’équipe e-mjpm.`;

const editorConfirmationEmail = async (email) => {
  try {
    await sendEmail(
      email,
      "e-MJPM : confirmation de la demande d'accès à l'api e-MJPM",
      EMAIL_EDITOR_CONFIRMATION()
    );
  } catch (error) {
    sentry.captureException(error);
    logger.error(error);
  }
};

module.exports = {
  editorConfirmationEmail,
};
