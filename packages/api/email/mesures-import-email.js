const { sendEmail } = require(".");

const EMAIL_TEXT = (creationNumber, updateNumber, errors) => `
Bonjour,

Résultat de l'import de vos mesures:
- ${creationNumber} mesure(s) ajoutée(s)
- ${updateNumber} mesure(s) mise(s) à jour
- ${errors.length} mesure(s) non traitée(s):
        ${errors.join("\n\t")}

Bien à vous.

eMJPM Team
`;

const mesuresImportEmail = (
  email,
  { creationNumber, updateNumber, errors }
) => {
  sendEmail(
    email,
    "eMJPM > Résultat de l'import de vos mesures",
    EMAIL_TEXT(creationNumber, updateNumber, errors),
    null,
    "support.emjpm@fabrique.social.gouv.fr"
  ).catch(e => {
    // todo: sentry
    /* eslint-disable no-console */
    console.log(e);
    /* eslint-enable no-console */
  });
};

module.exports = {
  mesuresImportEmail
};
