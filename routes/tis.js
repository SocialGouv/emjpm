var express = require("express");
var router = express.Router();
var queries = require("../db/queries");

const { loginRequired } = require("../auth/_helpers");

// TODO:  Security for mandataire
router.get("/:mandataireId/tis-by-mandataire", loginRequired, async (req, res, next) => {
    queries
        .getAllTisByMandataire(req.params.mandataireId)
        .then(etablissements => res.status(200).json(etablissements))
        .catch(error => next(error));
});

router.post("/1/tis", async (req, res, next) => {
    // secu : ensure TI can write on this mandataire + add related test
    const mandataire = await queries.getMandataireByUserId(req.user.id);
    console.log(req.body.ti_id)
    queries
        .addMandataireTis({
            ti_id: req.body.ti_id,
            mandataire_id: mandataire.id
        })
        .then(() => queries.getAllTisByMandataire(mandataire.id))
        .then(etablissements => res.status(200).json(etablissements))
        .catch(error => next(error));
});

router.delete(
    "/1/tis/:tiId",
    loginRequired,
    async (req, res, next) => {
        const mandataire = await queries.getMandataireByUserId(req.user.id);
        queries
            .deleteMandataireTis(req.params.tiId,mandataire.id)
            .then(() => queries.getAllTisByMandataire(mandataire.id))
            .then(etablissements => res.status(200).json(etablissements))
            .catch(error => {
                console.log(error);
                next(error);
            });
    }
);


router.get("/1/tis", loginRequired, async (req, res, next) => {
    const mandataire = await queries.getMandataireByUserId(req.user.id);
    queries
        .getAllTisByMandataire(mandataire.id)
        .then(etablissements => res.status(200).json(etablissements))
        .catch(error => next(error));
});

router.get("/tis", loginRequired, async (req, res, next) => {
    queries
        .getTis()
        .then(etablissements => res.status(200).json(etablissements))
        .catch(error => next(error));
});







module.exports = router;
