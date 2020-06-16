const sentry = require("../utils/sentry");
const logger = require("../utils/logger");
const { sendEmail } = require(".");

const EMAIL_RELANCE_TEXT = `
Bonjour,

Votre nouveau mot de passe a bien été enregistré.

Bien à vous.
`;

const EMAIL_RELANCE_HTML = `
Bonjour,<br>
<br>
Votre nouveau mot de passe a bien été enregistré.
<br><br><br>
Bien à vous.
`;

const confirmationPasswordEmail = async (email) => {
  try {
    await sendEmail(
      email,
      "Confirmation du mot de passe",
      EMAIL_RELANCE_TEXT,
      EMAIL_RELANCE_HTML
    );
  } catch (error) {
    sentry.captureException(error);
    logger.error(error);
  }
};

module.exports = {
  confirmationPasswordEmail,
};
