var express = require("express");
var router = express.Router();
var queries = require("../db/queries");

const { loginRequired } = require("../auth/_helpers");

router.get("/1/etablissement", loginRequired, async (req, res, next) => {
    const mandataire = await queries.getMandataireByUserId(req.user.id);
    queries
        .getAllEtablissementsByMandataire(mandataire.id)
        .then(etablissements => res.status(200).json(etablissements))
        .catch(error => next(error));
});


router.get("/:mandataireID/tisEtablissement", loginRequired, async (req, res, next) => {
    queries
        .getAllEtablissementsByMandataire(req.params.mandataireID)
        .then(etablissements => res.status(200).json(etablissements))
        .catch(error => next(error));
});

router.post("/1/etablissements", loginRequired, async (req, res, next) => {
    // secu : ensure TI can write on this mandataire + add related test
    const mandataire = await queries.getMandataireByUserId(req.user.id);
    queries
        .addMandataireToEtablissement({
            etablissement_id: req.body.etablissement_id,
            mandataire_id: mandataire.id
        })
        .then(commentaireID => queries.getAllEtablissementsByMandataire(mandataire.id))
        .then(etablissements => res.status(200).json(etablissements))
        .catch(error => next(error));
});

// todo : ensure user can delete this entry
router.delete(
    "/1/etablissements/:mandatairesEtablissementId",
    loginRequired,
    async (req, res, next) => {
        const mandataire = await queries.getMandataireByUserId(req.user.id);
        queries
            .deleteMandataireEtablissement(req.params.mandatairesEtablissementId)
            .then(() => queries.getAllEtablissementsByMandataire(mandataire.id))
            .then(etablissements => res.status(200).json(etablissements))
            .catch(error => {
                console.log(error);
                next(error);
            });
    }
);

router.get("/1/etablissements", loginRequired, async (req, res, next) => {
    const mandataire = await queries.getMandataireByUserId(req.user.id);
    queries
        .getEtablissements(mandataire.id)
        .then(etablissements => res.status(200).json(etablissements))
        .catch(error => next(error));
});







module.exports = router;
