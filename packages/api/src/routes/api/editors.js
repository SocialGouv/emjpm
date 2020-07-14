const express = require("express");
const router = express.Router();
const { body, check } = require("express-validator");
const { MESURE_PROTECTION } = require("@emjpm/core");

const {
  mesures,
  mesureCreate,
  mesureUpdate,
  mesureBatch,
  mesureDelete,
} = require("../../../src/controllers/editor");

router.get("/mesures", mesures);

router.post(
  "/mesures",
  [
    body("numero_rg").not().isEmpty().trim().escape(),
    body("annee_naissance").not().isEmpty().trim().escape(),
    body("civilite").isIn(MESURE_PROTECTION.CIVILITE.keys),
    body("date_nomination").isDate().toDate(),
    body("tribunal_siret").not().isEmpty().trim().escape(),
    body("antenne_id").optional().toInt(10),
    body("lieu_vie").optional().isIn(MESURE_PROTECTION.LIEU_VIE_MAJEUR.keys),
    check("etats.*.pays").isISO31661Alpha2(),
    check("etats.*.date_changement_etat").isDate().toDate(),
    check("etats.*.lieu_vie").not().isEmpty().trim().escape(),
    check("etats.*.nature_mesure").isIn(MESURE_PROTECTION.NATURE_MESURE.keys),
    check("etats.*.lieu_vie").isIn(MESURE_PROTECTION.LIEU_VIE_MAJEUR.keys),
  ],
  mesureCreate
);
router.put("/mesures/:id", mesureUpdate);
router.post("/mesures/batch", mesureBatch);
router.delete("/mesures/:id", mesureDelete);

module.exports = router;
