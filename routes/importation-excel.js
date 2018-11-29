const express = require("express");
const { typeRequired } = require("../auth/_helpers");

const queries = require("../db/queries/mesures");
const { addDataLogs } = require("../db/queries/logsData");

const router = express.Router();

const {
  updateCountMesures,
  getMandataireByUserId
} = require("../db/queries/mandataires");

router.post(
  "/mesures/bulk",
  typeRequired("individuel", "prepose"),
  async (req, res) => {
    const mandataire = await getMandataireByUserId(req.user.id);
    const mesures = req.body.map(datum => ({
      ...datum,
      mandataire_id: mandataire.id,
      status: "Mesure en cours"
    }));

    return queries
      .bulk({ mesures, mandataire_id: mandataire.id })
      .then(result => {
        const added = result
          .map((r, i) => (r.indexOf("OK") > -1 ? i + 2 : false))
          .filter(Boolean);
        let message = `${added.length} Mesures importées.`;
        const duplicates = result
          .map((r, i) => (r.indexOf("SKIP") > -1 ? i + 2 : false))
          .filter(Boolean);
        if (duplicates.length) {
          message += `\n\nLignes non importées : ${duplicates.join(", ")}.`;
        }
        res.json({
          success: true,
          added: added.length,
          message
        });
      })
      .then(() => updateCountMesures(mandataire.id))
      .then(() =>
        addDataLogs({
          user_id: req.user.id,
          action: "import excel",
          result: "success"
        })
      )
      .catch(e => {
        addDataLogs({
          user_id: req.user.id,
          action: "connexion",
          result: "no success"
        });
        console.log(e);
        return res.status(500).json({ success: false });
      });
  }
);

module.exports = router;
