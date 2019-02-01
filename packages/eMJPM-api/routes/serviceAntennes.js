var express = require("express");
var router = express.Router();
var queries = require("../db/queries");

router.get("/:mandataireId/antennes", async (req, res, next) => {
    const ti = await queries.getMandataireByUserId(req.user.id);
    queries
        .getAllAntennes(ti.id)
        .then(function(commentaires) {
            res.status(200).json(commentaires);
        })
        .catch(function(error) {
            next(error);
        });
});

router.post("/:mandataireId/antennes", async (req, res, next) => {
    // secu : ensure TI can write on this mandataire + add related test
    const ti = await queries.getMandataireByUserId(req.user.id);
    queries
        .addAntenne({
            ...req.body,
            service_id: ti.id
        })
        .then(function(commentaireID) {
            return queries.getAllAntennes(ti.id);
        })
        .then(function(commentaires) {
            res.status(200).json(commentaires);
        })
        .catch(function(error) {
            console.log(error);
            next(error);
        });
});

router.put("/:mandataireId/antennes/:antenneId", async (req, res, next) => {
    const ti = await queries.getMandataireByUserId(req.user.id);
    queries
        .updateAntenne(req.params.antenneId, req.body)
        .then(function() {
            return queries.getAllAntennes(ti.id);
        })
        .then(function(commentaire) {
            res.status(200).json(commentaire);
        })
        .catch(function(error) {
            next(error);
        });
});

router.delete("/:mandataireId/antennes/:antenneId", async (req, res, next) => {
    const ti = await queries.getMandataireByUserId(req.user.id);
    queries
        .deleteAntenne(req.params.antenneId)
        .then(function(commentaireID) {
            return queries.getAllAntennes(ti.id);
        })
        .then(function(commentaires) {
            res.status(200).json(commentaires);
        })
        .catch(function(error) {
            next(error);
        });
});
module.exports = router;