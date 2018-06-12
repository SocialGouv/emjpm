const express = require("express");

const router = express.Router();
const queries = require("../db/queries");


const {loginRequired} = require("../auth/_helpers");


router.put("/:mandataireId", async (req, res, next) => {
    const ti = await queries.getMandataireByUserId(req.user.id);
    queries
        .update(ti.id, req.body)
        .then(function() {
            return queries.getSingle(ti.id);
        })
        .then(function(mandataire) {
            res.status(200).json(mandataire);
        })
        .catch(function(error) {
            next(error);
        });
});

router.get("/:mandataireId", async (req, res, next) => {
    const ti = await queries.getMandataireByUserId(req.user.id);
    queries
        .getSingle(ti.id)
        .then(function(mandataire) {
            res.status(200).json(mandataire);
        })
        .catch(function(error) {
            next(error);
        });
});


router.post("/filters",loginRequired, async (req, res, next) => {
    const ti = await queries.getTiByUserId(req.user.id);
    queries
        .getAllByMandatairesFilter(ti.id,req.body.latNorthEast,req.body.latSouthWest,req.body.longNorthEast,req.body.longSouthWest)
        .then(function(mesures) {
            res.status(200).json(mesures);
        })
        .catch(function(error) {
            throw error;
            next(error);
        });
});


router.get("/",loginRequired, async (req, res, next) => {
    const ti = await queries.getTiByUserId(req.user.id);
    queries
        .getAllMandataires(ti.id)
        .then(function(mandataires) {
            res.status(200).json(mandataires);
        })
        .catch(function(error) {
            throw error;
            next(error);
        });
});

router.post("/PosteCode",loginRequired, async (req, res, next) => {
    console.log("Salut",req.body.codePoste)
    queries
        .getCoordonneByPosteCode(req.body.codePoste)
        .then(function(mandataires) {
            res.status(200).json(mandataires);
        })
        .catch(function(error) {
            throw error;
            next(error);
        });
});




router.put("/:mandataireId/capacite", async (req, res, next) => {
    const ti = await queries.getMandataireByUserId(req.user.id);
    const capaciteMandataire = queries.CapaciteMandataire(ti.id)
    console.log (capaciteMandataire)
    queries
        .update(ti.id, {disponibilite: capaciteMandataire})
        .then(function() {
            return queries.getSingle(ti.id);
        })
        .then(function(mandataire) {
            res.status(200).json(mandataire);
        })
        .catch(function(error) {
            next(error);
        });
});


router.put("/:mandataireId/capaciteEteinte", async (req, res, next) => {
    const ti = await queries.getMandataireByUserId(req.user.id);
    const capaciteMandataire = queries.CapaciteEteinteMandataire(ti.id)
    queries.CapaciteMandataire(ti.id)
        .then(function() {
            return  queries.CapaciteMandataire(ti.id);
        })
        .then(function(mandataire) {
            res.status(200).json(queries.CapaciteMandataire(ti.id));
        })
        .catch(function(error) {
            next(error);
        });
});

// router.post("/", function(req, res, next) {
//   queries
//     .add(req.body)
//     .then(function(mandataireID) {
//       return queries.getSingle(mandataireID);
//     })
//     .then(function(mandataire) {
//       res.status(200).json(mandataire);
//     })
//     .catch(function(error) {
//       next(error);
//     });
// });

router.use("/", require("./commentaires"));
router.use("/", require("./mandataireMesures"));
router.use("/", require("./serviceAntennes"));
router.use("/", require("./etablissementPreposes"));
module.exports = router;
