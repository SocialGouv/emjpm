const express = require("express");
const { format, addMonths, addDays } = require("date-fns");

const queries = require("../db/queries");
const { sendEmail } = require("../email");
const router = express.Router();

const isBefore = require("date-fns/is_before");
const isAfter = require("date-fns/is_after");

const isLate = mandataire => {
  const hasUpdatedLastMonth = isAfter(
    new Date(mandataire.date_mesure_update),
    new addMonths(Date.now(), -1)
  );

  const hasBeenMailedRecently = isAfter(
    new Date(mandataire.email_send),
    new addDays(Date.now(), -15)
  );

  return !hasUpdatedLastMonth && !hasBeenMailedRecently;
};

const EMAIL_RELANCE_TEXT = `
Bonjour,

L'équipe "e-mjpm" constate que vous n'avez pas actualisé vos informations durant ces 30 derniers jours.

Afin que les magistrats puissent connaître en temps réel votre activité et bénéficier d'un outil d'aide à la décision performant, nous vous prions de mettre à jour vos données.

Vous pouvez directement vous connecter via ce lien : https://emjpm.num.social.gouv.fr/

Pour toute difficulté, n'hésitez pas à nous contacter : contact@emjpm.beta.gouv.fr

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
Pour toute difficulté, n'hésitez pas à nous contacter : <a href="mailto:contact@emjpm.beta.gouv.fr">contact@emjpm.beta.gouv.fr</a>
<br><br><br>
En vous remerciant de votre précieuse collaboration.
<br><br><br>
Bien à vous.
`;

router.get("/relance-mandataires-inactifs", function(req, res, next) {
  queries
    .getAll()
    .then(mandataires =>
      mandataires.filter(isLate).map(mandataire =>
        sendEmail(
          mandataire.email,
          "e-MJPM : actualisez vos données",
          EMAIL_RELANCE_TEXT,
          EMAIL_RELANCE_HTML
        )
          .then(() => {
            // MAJ mandataire.email_send
            queries.updateMandataireMailSent(mandataire.id);
          })
          .catch(e => {
            // todo: sentry
            console.log(e);
          })
      )
    )
    .then(() => {
      res.json({ success: true });
    });
});

router.get("/test", function(req, res, next) {
  sendEmail(
    "contact@emjpm.beta.gouv.fr",
    "e-MJPM : test",
    "Bonjour !",
    "Bonjour !"
  );
  res.json({ success: true });
});

module.exports = {
  router,
  isLate
};
