const express = require("express");
const XLSX = require("xlsx");

const actionsMesuresImporter = require("./mesures-import/actionsMesuresImporter");
const checkImportMesuresParameters = require("./hasura-actions.mesures-import.checker");
const hasuraActionErrorHandler = require("../../../middlewares/hasura-error-handler");
const getMesures = require("../../../services/getMesures");
const router = express.Router();

// hasura action: `upload_mesures_file`
router.post(
  "/upload",
  async (req, res, next) => {
    try {
      const importMesuresParameters = await checkImportMesuresParameters(req);

      const importSummary = await actionsMesuresImporter.importMesuresFile(
        importMesuresParameters
      );

      return res.status(201).json({
        data: JSON.stringify(importSummary),
      });
    } catch (err) {
      return next(err);
    }
  },
  hasuraActionErrorHandler("Unexpected error processing file")
);

// hasura action: `export_mesures_file`
router.post(
  "/export",
  async (req, res, next) => {
    try {
      const { userId, serviceId } = req.user;
      const mesures = await getMesures({ userId, serviceId });
      const exportedMesures = mesures.map((mesure) => {
        const {
          numero_rg,
          numero_dossier,
          date_nomination,
          code_postal,
          ville,
          pays,
          civilite,
          annee_naissance,
          lieu_vie,
          nature_mesure,
          champ_mesure,
          tis,
          cabinet,
        } = mesure;
        return {
          numero_rg,
          numero_dossier,
          date_nomination,
          code_postal,
          ville,
          pays,
          civilite,
          annee_naissance,
          lieu_vie,
          nature_mesure,
          champ_mesure,
          tribunal: tis ? tis.etablissement : "",
          cabinet,
        };
      });
      if (mesures.length) {
        var ws = XLSX.utils.json_to_sheet(exportedMesures, {
          header: Object.keys(exportedMesures[0]),
        });
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Mesures eMJPM");
        res.header("Content-Type", "application/octet-stream");
        res.attachment("export_mesures.xlsx");

        var wopts = { bookType: "xlsx", bookSST: false, type: "base64" };
        var wbout = XLSX.write(wb, wopts);

        return res.send({ data: wbout });
      } else {
        return res.status(404).end();
      }
    } catch (err) {
      return next(err);
    }
  },
  hasuraActionErrorHandler("Unexpected error processing file")
);

module.exports = router;
