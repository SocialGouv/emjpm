const express = require("express");

const { sendEmail } = require("../email");
const router = express.Router();

const { getTiByUserId } = require("../db/queries/tis");

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
Une nouvelle mesure vous a été attribuée par le ${ti.etablissement} - ${
    ti.cabinet
  }
<br><br>
Rendez vous sur <a href="https://emjpm.num.social.gouv.fr/">e-mjpm</a> pour activer cette mesure.
<br><br>
A bientôt,<br>
L'équipe e-mjpm
`;
};

/** @swagger
 * /email/reservation-mesures:
 *   get:
 *     tags:
 *       - email
 *     description: send email to mandataire when Ti book a "mesure" for this mandataire.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: nom
 *         description: mandataire name
 *         required: true
 *         schema:
 *           type: object
 *       - in: query
 *         name: prenom
 *         description: mandataire nickname
 *         required: true
 *         schema:
 *           type: object
 *       - in: query
 *         name: etablissement
 *         description: mandataire establishment
 *         required: true
 *         schema:
 *           type: object
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */
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
  router
};
