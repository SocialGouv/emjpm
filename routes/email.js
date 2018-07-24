const express = require("express");
const { format, addMonths, addDays } = require("date-fns");

const queries = require("../db/queries");
const { sendEmail } = require("../email");
const router = express.Router();

const isLate = mandataire =>
  format(addMonths(new Date(mandataire.date_mesure_update), 1), "MM/DD/YYYY") <
    format(new Date(Date.now()), "MM/DD/YYYY") &&
  format(addDays(new Date(mandataire.email_send), 15), "MM/DD/YYYY") <
    format(new Date(Date.now()), "MM/DD/YYYY");

router.get("/relance-mandataires-inactifs", function(req, res, next) {
  queries
    .getAll()
    .then(mandataires =>
      mandataires.map(
        mandataire =>
          isLate(mandataire) &&
          sendEmail(
            mandataire.email,
            "e-MJPM : actualisez vos données",
            "e-MJPM : actualisez vos données",
            "Bonjour,\n" +
              "\n" +
              "L'équipe \"e-mjpm\" constate que vous n'avez pas actualisé vos informations durant ces 30 derniers jours. Afin que les magistrats puissent connaître en temps réel votre activité et bénéficier d'un outil d'aide à la décision performant, nous vous prions de mettre à jour vos données. Vous pouvez directement vous connecter via ce lien : https://emjpm.num.social.gouv.fr/ \n" +
              "\n" +
              "Pour toute difficulté, n'hésitez pas à nous contacter :\n" +
              "\n" +
              "contact@emjpm.beta.gouv.fr\n" +
              "\n" +
              "En vous remerciant de votre précieuse collaboration.\n" +
              "\n" +
              "Bien à vous"
          )
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
  )
    .then(() => {
      res.json({ success: true });
    })
    .catch(e => {
      res.json({ success: false, error: e });
    });
});

module.exports = router;
