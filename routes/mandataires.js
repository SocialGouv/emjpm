const express = require("express");

const router = express.Router();
const queries = require("../db/queries");

const { loginRequired } = require("../auth/_helpers");

// récupère les données d'un mandataire
router.get("/1", loginRequired, async (req, res, next) => {
  const mandataire = await queries.getMandataireByUserId(req.user.id);
  if (!mandataire) {
    return next(new Error(401));
  }
  queries
    .getSingle(mandataire.id)
    .then(mandataire => res.status(200).json(mandataire))
    .catch(error => next(error));
});

// met à jour les données d'un mandataire
router.put("/1", loginRequired, async (req, res, next) => {
  const mandataire = await queries.getMandataireByUserId(req.user.id);
  if (!mandataire) {
    return next(new Error(401));
  }
  queries
    .update(mandataire.id, req.body)
    .then(() => queries.getSingle(mandataire.id))
    .then(mandataire => res.status(200).json(mandataire))
    .catch(error => next(error));
});

// todo: test
router.post("/filters", loginRequired, async (req, res, next) => {
  const ti = await queries.getTiByUserId(req.user.id);
  queries
    .getAllByMandatairesFilter(
      ti.id,
      req.body.latNorthEast,
      req.body.latSouthWest,
      req.body.longNorthEast,
      req.body.longSouthWest
    )
    .then(function(mesures) {
      res.status(200).json(mesures);
    })
    .catch(function(error) {
      throw error;
      next(error);
    });
});

// récupère une liste de mandataires pour le user en question
// TODO : le user doit être un TI
// droits : ti lui-même
// récupère une liste de mandataires pour le user (ti) en question
router.get("/", loginRequired, async (req, res, next) => {
  if (req.user.type !== "ti") {
    return next(new Error(401));
  }
  const ti = await queries.getTiByUserId(req.user.id);
  if (!ti) {
    return next(new Error(401));
  }
  queries
    .getAllMandataires(ti.id)
    .then(mandataires => res.status(200).json(mandataires))
    .catch(error => next(error));
});

// todo: test
router.post("/PosteCode", loginRequired, async (req, res, next) => {
  console.log("Salut", req.body.codePoste);
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

// ?
// met à jour la capacité ("disponibilite") d'un mandataire
// selon le nb de mesures en cours
// droits : ?
//
// TODO : trigger pour MAJ + rename colonnes
// met à jour la capacité ("disponibilite") d'un mandataire
// selon le nb de mesures en cours
// droits : user en cours

router.put("/:mandataireId/capacite", async (req, res, next) => {
  const mandataire = await queries.getMandataireByUserId(req.user.id);
  if (!mandataire) {
    return next(new Error(401));
  }
  // récupères le nb de mesure attribuées pour ce mandataire
  const capaciteMandataire = queries.CapaciteMandataire(mandataire.id);
  queries
    .update(mandataire.id, { disponibilite: capaciteMandataire })
    .then(() => queries.getSingle(mandataire.id))
    .then(mandataire => res.status(200).json(mandataire))
    .catch(error => next(error));
});

router.use("/", require("./commentaires"));
router.use("/", require("./mandataireMesures"));
router.use("/", require("./serviceAntennes"));
router.use("/", require("./etablissementPreposes"));

module.exports = router;
