const express = require("express");
const { typeRequired } = require("../auth/_helpers");

const queries = require("../db/queries/mesures");

const router = express.Router();

const {
  updateCountMesures,
  getMandataireByUserId
} = require("../db/queries/mandataires");

router.post(
  "/:mandataireId/bulk",
  typeRequired("individuel", "prepose"),
  async (req, res, next) => {
    const mandataire = await getMandataireByUserId(req.user.id);
    const mesures = req.body.map(datum => ({
      ...datum,
      mandataire_id: mandataire.id,
      status: "Mesure en cours"
    }));
    return (
      queries
        .addMesure(mesures)
        //.then(() => queries.getMesuresEnCoursMandataire(mandataire.id)) // ???
        .then(() => updateCountMesures(mandataire.id))
        .then(() =>
          res.json({
            success: "success",
            message: `${req.body.length} Mesures importées`
          })
        )
        .catch(e => {
          console.log(e);
          return res.status(500).json({ success: "noSuccess" });
        })
    );
  }
);

module.exports = router;
