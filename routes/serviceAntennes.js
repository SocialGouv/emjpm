const express = require("express");
const router = express.Router();

const { loginRequired } = require("../auth/_helpers");

const {
  getAllAntennes,
  addAntenne,
  updateAntenne,
  deleteAntenne
} = require("../db/queries/serviceAntennes");

const { getMandataireByUserId } = require("../db/queries/mandataires");


router.get("/:mandataireId/antennes", loginRequired, async (req, res, next) => {
  const ti = await getMandataireByUserId(req.user.id);
  getAllAntennes(ti.id)
    .then(function(commentaires) {
      res.status(200).json(commentaires);
    })
    .catch(function(error) {
      next(error);
    });
});

router.post(
  "/:mandataireId/antennes",
  loginRequired,
  async (req, res, next) => {
    // secu : ensure TI can write on this mandataire + add related test
    const ti = await getMandataireByUserId(req.user.id);
    addAntenne({
      ...req.body,
      mandataire_id: ti.id
    })
      .then(function(commentaireID) {
        return getAllAntennes(ti.id);
      })
      .then(function(commentaires) {
        res.status(200).json(commentaires);
      })
      .catch(function(error) {
        console.log(error);
        next(error);
      });
  }
);

router.put(
  "/:mandataireId/antennes/:antenneId",
  loginRequired,
  async (req, res, next) => {
    const ti = await getMandataireByUserId(req.user.id);
    updateAntenne(req.params.antenneId, req.body)
      .then(function() {
        return getAllAntennes(ti.id);
      })
      .then(function(commentaire) {
        res.status(200).json(commentaire);
      })
      .catch(function(error) {
        next(error);
      });
  }
);

router.delete(
  "/:mandataireId/antennes/:antenneId",
  loginRequired,
  async (req, res, next) => {
    const mandataire = await getMandataireByUserId(req.user.id);
    deleteAntenne({
      id: req.params.antenneId,
      mandataire_id: mandataire.id
    })
      .then(function(commentaireID) {
        return getAllAntennes(mandataire.id);
      })
      .then(function(commentaires) {
        res.status(200).json(commentaires);
      })
      .catch(function(error) {
        next(error);
      });
  }
);
module.exports = router;
