const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const mesures = require("../../src/controllers/mesures");

router.get("/mesures", mesures.index);
router.post(
  "/mesures",
  [
    body("annee")
      .not()
      .isEmpty(),
    body("civilite")
      .not()
      .isEmpty(),
    body("date_ouverture")
      .not()
      .isEmpty(),
    body("numero_dossier")
      .not()
      .isEmpty(),
    body("numero_rg")
      .not()
      .isEmpty(),
    body("residence")
      .not()
      .isEmpty(),
    body("ti_id")
      .not()
      .isEmpty()
  ],
  mesures.create
);
router.post("/mesures/batch", mesures.batch);
router.delete("/mesures/:id", mesures.destroy);

module.exports = router;
