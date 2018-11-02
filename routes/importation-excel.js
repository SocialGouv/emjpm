const express = require("express");
const router = express.Router();

const queries = require("../db/queries/mesures");

const {
  updateCountMesures,
  getMandataireByUserId
} = require("../db/queries/mandataires");

router.post("/:mandataireId/files", async (req, res, next) => {
  const mandataire = await getMandataireByUserId(req.user.id);

  req.body.map(datum => {
    datum["mandataire_id"] = req.user.id;
    datum["status"] = "Mesure en cours";
  });
  return queries
    .addMesure(req.body)
    .then(() => queries.getMesuresEnCoursMandataire(mandataire.id))
    .then(() => updateCountMesures(mandataire.id))
    .then(() => {
      return res.json({ success: "success" });
    })
    .catch(e => {
      console.log(e);
      return res.status(500).json({ success: "noSuccess" });
    });
});

module.exports = router;
