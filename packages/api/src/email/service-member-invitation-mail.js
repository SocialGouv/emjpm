const { sendEmail } = require(".");

const text = (invitation, url) =>
  `Madame, Monsieur,

  ${invitation.token}

  ${url}

  À bientôt

  L’équipe e-mjpm.`;

const html = (invitation, url) =>
  `Madame, Monsieur,
  <br><br>
    ${invitation.token}
    <a href=${url}>réinitialiser mon mot de passe</a>.
  <br><br>
    À bientôt
  <br><br>
  L’équipe e-mjpm.`;

const serviceMemberInvitationMail = async invitation => {
  const url = `${process.env.APP_URL}/signup/invitation?token=${invitation.token}`;

  console.log(url);

  sendEmail(
    invitation.email,
    "e-MJPM : vous êtes invité à vous inscrire sur la plateforme e-MJPM",
    text(invitation, url),
    html(invitation, url)
  ).catch(e => {
    /* eslint-disable no-console */
    console.log(e);
    /* eslint-enable no-console */
  });
};

module.exports = { serviceMemberInvitationMail };
