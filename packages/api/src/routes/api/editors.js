const express = require("express");
const router = express.Router();
const { param } = require("express-validator");
const { rules, batchRules } = require("./editors-rules");
const editorMesureAntenne = require("../../middlewares/editor-mesures-antenne");
const editorMesureTi = require("../../middlewares/editor-mesures-ti");
const editorMesureUser = require("../../middlewares/editor-mesures-user");

const {
  mesures,
  mesure,
  serviceAntennes,
  tribunaux,
  mesureCreate,
  mesureUpdate,
  mesureBatch,
  mesureDelete,
} = require("../../../src/controllers/editor");

router.get("/mesures", mesures);

router.get("/service-antennes", serviceAntennes.getAntennes);
router.get("/tribunaux", tribunaux.getTribunaux);

router
  .post(
    "/mesures",
    rules,
    editorMesureUser,
    editorMesureTi,
    editorMesureAntenne,
    mesureCreate
  )
  .put(
    "/mesures/:id",
    rules,
    editorMesureUser,
    editorMesureTi,
    editorMesureAntenne,
    mesureUpdate
  );

router.post("/mesures/batch", batchRules, editorMesureUser, mesureBatch);

router.delete("/mesures/:id", mesureDelete.deleteById);
router.delete("/mesures", mesureDelete.deleteAll);
router.get("/mesures/:id", param("id").isInt(), mesure);

module.exports = router;
