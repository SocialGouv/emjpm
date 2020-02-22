const express = require("express");
const router = express.Router();

const mesures = require("../../src/controllers/mesures");

router.get("/mesures", mesures.index);
router.post("/mesures", mesures.create);
router.delete("/mesures/:id", mesures.destroy);

module.exports = router;
