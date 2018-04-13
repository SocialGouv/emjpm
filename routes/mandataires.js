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
module.exports = router;
