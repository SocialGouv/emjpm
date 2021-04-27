const express = require("express");

const { Departement } = require("~/models");
const { Mesure } = require("~/models");
const hasuraActionErrorHandler = require("~/middlewares/hasura-error-handler");

const availableMesureNbGlobal = require("./available-mesures/global");
const availableMesureNbOver = require("./available-mesures/over");
const availableMesureNbReal = require("./available-mesures/real");
const availableMesureNbUnknownGestion = require("./available-mesures/unknown-gestion");

const router = express.Router();

router.post("/opened-mesures", async (req, res) => {
  const { regionId, departementCode, start, end } = req.body.input;
  const departementCodes = await getDepartementCodes(regionId, departementCode);

  const query = Mesure.query().count("id");
  if (start) {
    query.where("date_nomination", ">", start);
  }
  if (end) {
    query.where("date_nomination", "<=", end);
  }
  if (departementCodes) {
    query.where("departement_code", "in", departementCodes);
  }
  query.where("status", "en_cours");

  const [openedMesuresNb] = await query;

  return res.status(200).json({
    opened_mesures_nb: openedMesuresNb.count,
  });
});

router.post("/closed-mesures", async (req, res) => {
  const { regionId, departementCode, start, end } = req.body.input;

  const departementCodes = await getDepartementCodes(regionId, departementCode);

  const query = Mesure.query().count("id");
  if (start) {
    query.where("date_fin_mesure", ">", start);
  }
  if (end) {
    query.where("date_fin_mesure", "<=", end);
  }
  if (departementCodes) {
    query.where("departement_code", "in", departementCodes);
  }
  query.where("status", "eteinte");

  const [closedMesuresNb] = await query;

  return res.status(200).json({
    closed_mesures_nb: closedMesuresNb.count,
  });
});

router.post(
  "/available-mesures",
  async (req, res, next) => {
    const { regionId, departementCode } = req.body.input;
    try {
      const nbGlobal = await availableMesureNbGlobal({
        departementCode,
        regionId,
      });

      const nbOver = await availableMesureNbOver({
        departementCode,
        regionId,
      });

      const nbReal = await availableMesureNbReal({
        departementCode,
        regionId,
      });

      const nbUnknownGestion = await availableMesureNbUnknownGestion({
        departementCode,
        regionId,
      });

      return res.status(200).json({
        available_mesures_nb_global: nbGlobal,
        available_mesures_nb_over: nbOver,
        available_mesures_nb_real: nbReal,
        available_mesures_nb_unknown_gestion: nbUnknownGestion,
      });
    } catch (err) {
      return next(err);
    }
  },
  hasuraActionErrorHandler("Unexpected error processing file")
);

module.exports = router;

async function getDepartementCodes(regionId, departementCode) {
  let departementCodes;
  if (departementCode) {
    departementCodes = [departementCode];
  } else if (regionId) {
    const queryResult =
      (await Departement.query().where({ id_region: regionId }).select("id")) ||
      [];
    departementCodes = queryResult.map((res) => res.id);
  }
  return departementCodes;
}
