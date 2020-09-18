const express = require("express");
const router = express.Router();
const { param, body, check } = require("express-validator");
const { MESURE_PROTECTION } = require("@emjpm/core");
const { rules } = require("./editors-rules");
const editorMesureAntenne = require("../../middlewares/editor-mesures-antenne");
const editorMesureTi = require("../../middlewares/editor-mesures-ti");
const editorMesureLastEtat = require("../../middlewares/editor-mesures-last-etat");
const editorMesureUser = require("../../middlewares/editor-mesures-user");

const {
  mesures,
  mesure,
  serviceAntennes,
  mesureCreate,
  mesureUpdate,
  mesureBatch,
  mesureDelete,
} = require("../../../src/controllers/editor");

router.get("/mesures", mesures);

router.get("/service-antennes", serviceAntennes.getAntennes);

router
  .post(
    "/mesures",
    rules,
    editorMesureUser,
    editorMesureTi,
    editorMesureLastEtat,
    editorMesureAntenne,
    mesureCreate
  )
  .put(
    "/mesures/:id",
    rules,
    editorMesureUser,
    editorMesureTi,
    editorMesureLastEtat,
    editorMesureAntenne,
    mesureUpdate
  );

router.post(
  "/mesures/batch",
  [
    body("mesures.*.numero_rg").not().isEmpty().trim().escape(),
    body("mesures.*.annee_naissance").not().isEmpty().trim().escape(),
    body("mesures.*.civilite").isIn(MESURE_PROTECTION.CIVILITE.keys),
    body("mesures.*.date_nomination").isDate().toDate(),
    body("mesures.*.date_fin_mesure").optional().isDate().toDate(),
    body("mesures.*.date_premier_mesure").optional().isDate().toDate(),
    body("mesures.*.date_protection_en_cours").optional().isDate().toDate(),
    body("mesures.*.tribunal_siret").not().isEmpty().trim().escape(),
    body("mesures.*.antenne_id").optional().toInt(10),
    body("mesures.*.cause_sortie")
      .optional()
      .isIn(MESURE_PROTECTION.CAUSE_SORTIE.keys),
    body("mesures.*.resultat_revision")
      .optional()
      .isIn(MESURE_PROTECTION.RESULTAT_REVISION.keys),
    check("mesures.*.etats.*.pays").isISO31661Alpha2(),
    check("mesures.*.etats.*.date_changement_etat").isDate().toDate(),
    check("mesures.*.etats.*.nature_mesure").isIn(
      MESURE_PROTECTION.NATURE_MESURE.keys
    ),
    check("mesures.*.etats.*.lieu_vie").isIn(
      MESURE_PROTECTION.LIEU_VIE_MAJEUR.keys
    ),
  ],
  mesureBatch
);

router.delete("/mesures/:id", mesureDelete.deleteById);
router.delete("/mesures", mesureDelete.deleteAll);
router.get("/mesures/:id", param("id").isInt(), mesure);

module.exports = router;
