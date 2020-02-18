const { sendEmail } = require(".");

const text = (service, url) =>
  `Madame, Monsieur,

  Vous êtes invité par l'administrateur du service mandataire ${service.etablissement} à créer un compte sur e-mjpm.

  Veuillez cliquer sur le lien suivant: ${url}

  À bientôt

  L’équipe e-mjpm.`;

const html = (service, url) =>
  `Madame, Monsieur,
  <br><br>
    Vous êtes invité par l'administrateur du service mandataire ${service.etablissement} à créer un compte sur e-mjpm.
    <br><br>
    Veuillez cliquer sur le lien suivant <a href=${url}>Créer mon compte</a>.
  <br><br>
    À bientôt
  <br><br>
  L’équipe e-mjpm.`;

const serviceMemberInvitationMail = async (invitation, service) => {
  const url = `${process.env.APP_URL}/signup/invitation?token=${invitation.token}`;

  sendEmail(
    invitation.email,
    "Vous êtes invité à vous inscrire sur la plateforme e-mjpm",
    text(service, url),
    html(service, url)
  ).catch(e => {
    /* eslint-disable no-console */
    console.log(e);
    /* eslint-enable no-console */
  });
};

module.exports = { serviceMemberInvitationMail };
