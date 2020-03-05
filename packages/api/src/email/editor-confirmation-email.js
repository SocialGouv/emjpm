const { sendEmail } = require(".");

const EMAIL_EDITOR_CONFIRMATION = () =>
  `Madame, Monsieur,

  Nous avons bien pris en compte votre demande d'accès à l'api e-mjpm des éditeurs de logiciel métier.
  Le délai de traitement des demandes est en moyenne de 2 jours ouvrés.

À bientôt

L’équipe e-mjpm.`;

const editorConfirmationEmail = async email => {
  sendEmail(
    email,
    "e-MJPM : confirmation de la demande d'accès à l'api e-MJPM",
    EMAIL_EDITOR_CONFIRMATION()
  ).catch(e => {
    /* eslint-disable no-console */
    console.log(e);
    /* eslint-enable no-console */
  });
};

module.exports = {
  editorConfirmationEmail
};
