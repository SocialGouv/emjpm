const { sendEmail } = require("../email");

const EMAIL_RELANCE_TEXT = `
Bonjour,

Vous avez demandé le changement de mot de passe.

Bien à vous.
`;

const EMAIL_RELANCE_HTML = url => `
Bonjour,<br>
<br>
Vous avez demandé le changement de mot de passe.
<br><br>
Veuillez cliquer sur le liens suivant: <a href=${url}>liens</a>.
<br><br><br>
Bien à vous.
`;

const resetPasswordEmail = (email, url) => {
  return sendEmail(
    email,
    "Nouvau mot de passe pour e-MJPM",
    EMAIL_RELANCE_TEXT,
    EMAIL_RELANCE_HTML(url)
  ).catch(e => {
    // todo: sentry
    console.log(e);
  });
};

module.exports = {
  resetPasswordEmail
};
