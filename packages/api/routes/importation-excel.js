const express = require("express");
const createError = require("http-errors");

const { typeRequired } = require("../auth/_helpers");
const queries = require("../db/queries/mesures");
const { addDataLogs } = require("../db/queries/logsData");

const router = express.Router();

const { findMandataire } = require("../db/queries/mandataires");

router.post(
  "/mesures/bulk",
  typeRequired("individuel", "prepose", "service"),
  async (req, res, next) => {
    try {
      const mandataire = await findMandataire(req, req.body.mandataireId);

      if (req.user.type === "service" && mandataire.user_id !== req.user.id) {
        throw createError.Unauthorized(`Mandataire not authorized`);
      }
      if (!mandataire) {
        throw createError.NotFound(`Mandataire not found`);
      }

      const mesures =
        (req.body &&
          req.body.sheetData &&
          req.body.sheetData.map &&
          req.body.sheetData.map(datum => ({
            ...datum,
            mandataire_id: mandataire.id,
            status: "Mesure en cours"
          }))) ||
        [];

      if (req.body.sheetData && !req.body.sheetData.length) {
        res.json({
          success: false,
          added: 0,
          message: "Aucune mesure importée"
        });
        return;
      }

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
        .then(() =>
          addDataLogs({
            user_id: req.user.id,
            action: "import excel",
            result: "success"
          })
        )
        .catch(() => {
          addDataLogs({
            user_id: req.user.id,
            action: "import excel",
            result: "fail"
          });
          if (!res._headerSent) {
            return res.status(500).json({ success: false });
          }
        });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
