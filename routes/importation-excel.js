const express = require("express");
const router = express.Router();

const knex = require("../db/knex");
const queries = require("../db/queries/mesures");

router.post("/:mandataireId/files", async (req, res, next) => {
  req.body.map(datum => {
    datum["mandataire_id"] = req.user.id;
    datum["status"] = "Mesure en cours";
  });
  return queries
    .addMesure(req.body)
    .then(() => {
      return res.json({ success: "success" });
    })
    .catch(e => {
      console.log(e);
      return res.status(500).json({ success: "noSuccess" });
    });
});

module.exports = router;
