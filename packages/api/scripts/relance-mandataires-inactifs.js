const { sendEmail } = require("../email");

const {
  mandataireProfilNotUpdateEmail,
  updateMandataireMailSent
} = require("../db/queries/email");

const knex = require("../db/knex");

const EMAIL_RELANCE_TEXT = `
Bonjour,

L'équipe "e-mjpm" constate que vous n'avez pas actualisé vos informations durant ces 30 derniers jours.

Afin que les magistrats puissent connaître en temps réel votre activité et bénéficier d'un outil d'aide à la décision performant, nous vous prions de mettre à jour vos données.

Vous pouvez directement vous connecter via ce lien : https://emjpm.num.social.gouv.fr/

Pour toute difficulté, n'hésitez pas à nous contacter : support.emjpm@fabrique.social.gouv.fr

En vous remerciant de votre précieuse collaboration.


Bien à vous.
`;

const EMAIL_RELANCE_HTML = `
Bonjour,<br>
<br>
L'équipe "e-mjpm" constate que vous n'avez pas actualisé vos informations durant ces 30 derniers jours.
<br><br>
Afin que les magistrats puissent connaître en temps réel votre activité et bénéficier d'un outil d'aide à la décision performant, nous vous prions de mettre à jour vos données.
<br><br>
Vous pouvez directement vous connecter via ce lien : <a href="https://emjpm.num.social.gouv.fr/">emjpm.num.social.gouv.fr</a>
<br><br>
Pour toute difficulté, n'hésitez pas à nous contacter : <a href="mailto:support.emjpm@fabrique.social.gouv.fr">support.emjpm@fabrique.social.gouv.fr</a>
<br><br><br>
En vous remerciant de votre précieuse collaboration.
<br><br><br>
Bien à vous.
`;

const relanceMandataireProfilNotUpdated = () => {
  return mandataireProfilNotUpdateEmail().then(mandataires => {
    return (
      mandataires &&
      mandataires.map &&
      mandataires.map(mandataire => {
        /* eslint-disable no-console */
        console.log(`send email-relance to ${mandataire.email}`);
        /* eslint-enable no-console */
        return sendEmail(
          mandataire.email,
          "e-MJPM : actualisez vos données",
          EMAIL_RELANCE_TEXT,
          EMAIL_RELANCE_HTML
        )
          .then(() => {
            /* eslint-disable no-console */
            console.log(`ERROR sending email-relance to ${mandataire.email}`);
            /* eslint-enable no-console */
            // MAJ mandataire.email_send
            return updateMandataireMailSent(mandataire.id);
          })
          .catch(e => {
            // todo: sentry
            /* eslint-disable no-console */
            console.log(e);
            /* eslint-enable no-console */
          });
      })
    );
  });
};

if (require.main === module) {
  relanceMandataireProfilNotUpdated().then(() => {
    knex.destroy();
  });
}

// module.exports = {
//   relanceMandataireProfilNotUpdate
// };
