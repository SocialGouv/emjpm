const sentry = require("../utils/sentry");
const logger = require("../utils/logger");
const { sendEmail } = require(".");

const EMAIL_TEXT = (
  creationNumber,
  updateNumber,
  errors,
  mesures_en_cours,
  dispo_max
) => `
Bonjour,

Résultat de l'import de vos mesures:
- ${creationNumber} mesure(s) ajoutée(s)
- ${updateNumber} mesure(s) mise(s) à jour
- ${errors.length} mesure(s) non traitée(s):
        ${errors.join("\n\t")}

Pour rappel, à ce jour, vous avez déclaré "${mesures_en_cours}" mesures pour une capacité souhaitée de "${dispo_max}" mesures .

Bien à vous.

eMJPM Team
`;

const mesuresImportEmail = async (
  { email, mesures_en_cours, dispo_max },
  { creationNumber, updateNumber, errors }
) => {
  try {
    await sendEmail(
      email,
      "eMJPM > Résultat de l'import de vos mesures",
      EMAIL_TEXT(
        creationNumber,
        updateNumber,
        errors,
        mesures_en_cours,
        dispo_max
      ),
      null,
      "support.emjpm@fabrique.social.gouv.fr"
    );
  } catch (error) {
    sentry.captureException(error);
    logger.error(error);
  }
};

module.exports = {
  mesuresImportEmail,
};
