const express = require("express");
const router = express.Router();
const { param, body, check } = require("express-validator");
const { MESURE_PROTECTION } = require("@emjpm/core");

const {
  mesures,
  mesure,
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
    body("date_fin_mesure").isDate().toDate(),
    body("date_premier_mesure").optional().isDate().toDate(),
    body("date_protection_en_cours").optional().isDate().toDate(),
    body("tribunal_siret").not().isEmpty().trim().escape(),
    body("antenne_id").optional().toInt(10),
    body("lieu_vie").optional().isIn(MESURE_PROTECTION.LIEU_VIE_MAJEUR.keys),
    body("cause_sortie").optional().isIn(MESURE_PROTECTION.CAUSE_SORTIE.keys),
    body("resultat_revision").isIn(MESURE_PROTECTION.RESULTAT_REVISION.keys),
    check("etats.*.pays").isISO31661Alpha2(),
    check("etats.*.date_changement_etat").isDate().toDate(),
    check("etats.*.lieu_vie").not().isEmpty().trim().escape(),
    check("etats.*.nature_mesure").isIn(MESURE_PROTECTION.NATURE_MESURE.keys),
    check("etats.*.lieu_vie").isIn(MESURE_PROTECTION.LIEU_VIE_MAJEUR.keys),
  ],
  mesureCreate
);
router.put(
  "/mesures/:id",
  [
    body("numero_rg").not().isEmpty().trim().escape(),
    body("annee_naissance").not().isEmpty().trim().escape(),
    body("civilite").isIn(MESURE_PROTECTION.CIVILITE.keys),
    body("date_nomination").isDate().toDate(),
    body("date_fin_mesure").isDate().toDate(),
    body("date_premier_mesure").optional().isDate().toDate(),
    body("date_protection_en_cours").optional().isDate().toDate(),
    body("tribunal_siret").not().isEmpty().trim().escape(),
    body("antenne_id").optional().toInt(10),
    body("lieu_vie").optional().isIn(MESURE_PROTECTION.LIEU_VIE_MAJEUR.keys),
    body("cause_sortie").optional().isIn(MESURE_PROTECTION.CAUSE_SORTIE.keys),
    body("resultat_revision").isIn(MESURE_PROTECTION.RESULTAT_REVISION.keys),
    check("etats.*.pays").isISO31661Alpha2(),
    check("etats.*.date_changement_etat").isDate().toDate(),
    check("etats.*.lieu_vie").not().isEmpty().trim().escape(),
    check("etats.*.nature_mesure").isIn(MESURE_PROTECTION.NATURE_MESURE.keys),
    check("etats.*.lieu_vie").isIn(MESURE_PROTECTION.LIEU_VIE_MAJEUR.keys),
  ],
  mesureUpdate
);
router.post("/mesures/batch", mesureBatch);
router.delete("/mesures/:id", mesureDelete);
router.get("/mesures/:id", param("id").isInt(), mesure);

module.exports = router;
