const express = require("express");
const XLSX = require("xlsx");

const actionsMesuresImporter = require("./mesures-import/actionsMesuresImporter");
const checkImportMesuresParameters = require("./hasura-actions.mesures-import.checker");
const hasuraActionErrorHandler = require("../../../middlewares/hasura-error-handler");
const getMesures = require("../../../services/getMesures");
const { Tis } = require("../../../models/Tis");
const { Mesure } = require("../../../models/Mesure");
const { isEnAttente } = require("@emjpm/core");
const { getEmailUserDatas } = require("../../../email/email-user-data");
const {
  cancelReservationEmail,
} = require("../../../email/cancel-reservation-email");

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

// hasura action: `delete_mesure`
router.post("/delete", async function (req, res) {
  const { mesure_id } = req.body.input;

  try {
    const mesure = await Mesure.query().findById(mesure_id);
    const { ti_id, service_id, mandataire_id, status } = mesure;

    if (!isEnAttente({ status }))
      throw new Error(
        `Delete needs a mesure with en_attente status (The mesure_id ${mesure.id} has ${status} status)`
      );

    const nbDeleted = await Mesure.query().deleteById(mesure_id);

    if (nbDeleted === 0) return res.json({ success: false });

    const ti = await Tis.query().findById(ti_id);
    const users = await getEmailUserDatas(mandataire_id, service_id);
    const emails = users.map((user) =>
      cancelReservationEmail(ti, mesure, user)
    );

    Promise.all(emails);
  } catch (error) {
    console.error(error);
    hasuraActionErrorHandler("Unexpected error with delete mesure");

    return res.json({ success: false });
  }

  res.json({ success: true });
});

module.exports = router;
