const express = require("express");
const { format, addMonths, addDays } = require("date-fns");

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

const {getTiByUserId} = require("../db/queries/tis")

const {
    getAll,
    updateMandataireMailSent
} = require("../db/queries/email");

const hasEmail = mandataire => !!mandataire.email;

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
getAll()
    .then(mandataires =>
      mandataires
        .filter(hasEmail)
        .filter(isLate)
        .map(mandataire =>
          sendEmail(
            mandataire.email,
            "e-MJPM : actualisez vos données",
            EMAIL_RELANCE_TEXT,
            EMAIL_RELANCE_HTML
          )
            .then(() => {
              // MAJ mandataire.email_send
              return updateMandataireMailSent(mandataire.id);
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

const EMAIL_RESERVATION_TEXT = (nom, prenom, etablissement, ti) => {
  `
Bonjour ${nom + prenom || etablissement},

Une nouvelle mesure vous a été attribuée par le ${ti.etablissement}

Rendez vous sur e-mjpm pour activer cette mesure.

A bientôt,
L'équipe e-mjpm
`;
};

const EMAIL_RESERVATION_HTML = (nom, prenom, etablissement, ti) => {
  `
Bonjour ${nom + prenom || etablissement},<br>
<br>
Une nouvelle mesure vous a été attribuée par le ${ti.etablissement}
<br><br>
Rendez vous sur <a href="https://emjpm.num.social.gouv.fr/">e-mjpm</a> pour activer cette mesure.
<br><br>
A bientôt,<br>
L'équipe e-mjpm
`;
};

router.get("/reservation-mesures", function async(req, res, next) {
  getTiByUserId(req.user.id).then(ti => {
    sendEmail(
      req.query.email,
      "e-MJPM : une nouvelle mesure vous a été attribué",
      EMAIL_RESERVATION_TEXT(
        req.query.nom,
        req.query.prenom,
        req.query.etablissement,
        ti
      ),
      EMAIL_RESERVATION_HTML(
        req.query.nom,
        req.query.prenom,
        req.query.etablissement,
        ti
      )
    ).catch(e => {
      // todo: sentry
      console.log(e);
    });
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
