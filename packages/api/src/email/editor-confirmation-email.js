const { sendEmail } = require(".");

const EMAIL_EDITOR_CONFIRMATION = () =>
  `Madame, Monsieur,

  Nous avons le plaisir de vous confirmer votre demande d'accès à l'api e-MJPM pour les éditeurs de logitiels métier à destination des mandataires et des services de mandataire.
  
  Veuillez que notre équipe a besoin d'un petit délai pour valider votre demande.

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
