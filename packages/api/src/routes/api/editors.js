const express = require("express");

const router = express.Router();
const { param } = require("express-validator");
const { rules, batchRules } = require("./editors-rules");
const editorMesureAntenne = require("~/middlewares/editor-mesures-antenne");
const editorMesureTi = require("~/middlewares/editor-mesures-ti");
const editorMesureUser = require("~/middlewares/editor-mesures-user");
const contentTypeValidator = require("~/middlewares/editor-contenttype-json");

const {
  mesures,
  mesure,
  serviceAntennes,
  tribunaux,
  mesureCreate,
  mesureUpdate,
  mesureBatch,
  mesureDelete,
} = require("~/controllers/editor");

router.get("/mesures", editorMesureUser, mesures);

router.get("/service-antennes", serviceAntennes.getAntennes);
router.get("/tribunaux", tribunaux.getTribunaux);

router
  .post(
    "/mesures",
    contentTypeValidator,
    rules,
    editorMesureUser,
    editorMesureTi,
    editorMesureAntenne,
    mesureCreate
  )
  .put(
    "/mesures/:id",
    contentTypeValidator,
    rules,
    editorMesureUser,
    editorMesureTi,
    editorMesureAntenne,
    mesureUpdate
  );

router.post(
  "/mesures/batch",
  contentTypeValidator,
  batchRules,
  editorMesureUser,
  mesureBatch
);

router.delete("/mesures/:id", editorMesureUser, mesureDelete.deleteById);
router.delete("/mesures", editorMesureUser, mesureDelete.deleteAll);
router.get("/mesures/:id", param("id").isInt(), editorMesureUser, mesure);

module.exports = router;
