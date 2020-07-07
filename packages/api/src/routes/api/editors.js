const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

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
    body("annee").not().isEmpty(),
    body("civilite").not().isEmpty(),
    body("date_ouverture").not().isEmpty(),
    body("numero_dossier").not().isEmpty(),
    body("numero_rg").not().isEmpty(),
    body("lieu_vie").not().isEmpty(),
    body("ti_id").not().isEmpty(),
  ],
  mesureCreate
);
router.put("/mesures/:id", mesureUpdate);
router.post("/mesures/batch", mesureBatch);
router.delete("/mesures/:id", mesureDelete);

module.exports = router;
