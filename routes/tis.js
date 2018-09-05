var express = require("express");
var router = express.Router();

const { loginRequired } = require("../auth/_helpers");

const {
  getAllTisByMandataire,
  addMandataireTis,
  deleteMandataireTis,
  getTis
} = require("../db/queries/tis");

const { getMandataireByUserId } = require("../db/queries/mandataires");

// TODO:  Security for mandataire
router.get(
  "/:mandataireId/tis-by-mandataire",
  loginRequired,
  async (req, res, next) => {
    getAllTisByMandataire(req.params.mandataireId)
      .then(etablissements => res.status(200).json(etablissements))
      .catch(error => next(error));
  }
);

router.post("/1/tis", loginRequired, async (req, res, next) => {
  // secu : ensure TI can write on this mandataire + add related test
  const mandataire = await getMandataireByUserId(req.user.id);
  addMandataireTis({
    ti_id: req.body.ti_id,
    mandataire_id: mandataire.id
  })
    .then(() => getAllTisByMandataire(mandataire.id))
    .then(etablissements => res.status(200).json(etablissements))
    .catch(error => next(error));
});

// TODO: ensure we can delete this
router.delete("/1/tis/:tiId", loginRequired, async (req, res, next) => {
  const mandataire = await getMandataireByUserId(req.user.id);
  deleteMandataireTis(req.params.tiId, mandataire.id)
    .then(() => getAllTisByMandataire(mandataire.id))
    .then(etablissements => res.status(200).json(etablissements))
    .catch(error => {
      console.log(error);
      next(error);
    });
});

router.get("/1/tis", loginRequired, async (req, res, next) => {
  const mandataire = await getMandataireByUserId(req.user.id);
  getAllTisByMandataire(mandataire.id)
    .then(etablissements => res.status(200).json(etablissements))
    .catch(error => next(error));
});

router.get("/tis", loginRequired, async (req, res, next) => {
  getTis()
    .then(etablissements => res.status(200).json(etablissements))
    .catch(error => next(error));
});

module.exports = router;
