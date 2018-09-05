const express = require("express");

const router = express.Router();

const { loginRequired } = require("../auth/_helpers");

const {
  getMandataireById,
  getMandataireByUserId,
  updateMandataire,
  updateCountMesures,
  mesureEnAttente,
  update,
  getAllServicesByTis,
  getAllMandataires,
  getAllByMandatairesFilter,
  getCoordonneByPosteCode
} = require("../db/queries/mandataires");

const {getTiByUserId} = require("../db/queries/tis")

// récupère les données d'un mandataire
router.get("/1", loginRequired, async (req, res, next) => {
  const mandataire = await getMandataireByUserId(req.user.id);
  if (!mandataire) {
    return next(new Error(401));
  }
  res.status(200).json(mandataire);
});

const WHITELIST = [
  "nom",
  "prenom",
  "etablissement",
  "genre",
  "telephone",
  "telephone_portable",
  "email",
  "adresse",
  "code_postal",
  "ville",
  "dispo_max",
  "secretariat",
  "nb_secretariat",
  "mesures_en_cours"
];

const whiteList = obj =>
  Object.keys(obj)
    .filter(key => WHITELIST.indexOf(key) > -1)
    .reduce((a, c) => ({ ...a, [c]: obj[c] }), {});

// met à jour les données d'un mandataire
router.put("/1", loginRequired, async (req, res, next) => {
  const mandataire = await getMandataireByUserId(req.user.id);
  if (!mandataire) {
    return next(new Error(401));
  }
  const body = whiteList(req.body);

  if (Object.keys(body).length === 0) {
    res.status(200).json(mandataire);
    return next();
  }

  updateMandataire(mandataire.id, body)
    .then(() => getMandataireById(mandataire.id))
    .then(mandataire => {
      res.status(200).json(mandataire);
    })
    .catch(error => {
      console.log(error);
      throw error;
      next(error);
    });
});

// todo: test
router.post("/filters", loginRequired, async (req, res, next) => {
  const ti = await getTiByUserId(req.user.id);
  getAllByMandatairesFilter(
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
  const ti = await getTiByUserId(req.user.id);
  if (!ti) {
    return next(new Error(401));
  }
  getAllMandataires(ti.id)
    .then(mandataires => res.status(200).json(mandataires))
    .catch(error => next(error));
});

router.get("/services", loginRequired, async (req, res, next) => {
  if (req.user.type !== "ti") {
    return next(new Error(401));
  }
  const ti = await getTiByUserId(req.user.id);
  if (!ti) {
    return next(new Error(401));
  }
  getAllServicesByTis(ti.id)
    .then(mandataires => res.status(200).json(mandataires))
    .catch(error => next(error));
});

// todo: test
router.post("/PosteCode", loginRequired, async (req, res, next) => {
 getCoordonneByPosteCode(req.body.codePoste)
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
  const mandataire = await getMandataireByUserId(req.user.id);
  if (!mandataire) {
    return next(new Error(401));
  }
  updateCountMesures(mandataire.id).then(() => {
    res
      .status(200)
      .json(mandataire)
      .catch(error => next(error));
  });
});

router.put(
  "/:mandataireId/mesures-en-attente",
  loginRequired,
  async (req, res, next) => {
    // const mandataire = await queries.getMandataireByUserId(req.user.id);
    // if (!mandataire) {
    //   return next(new Error(401));
    // }
    // récupères le nb de mesure attribuées pour ce mandataire
    const MesureEnAttente = mesureEnAttente(req.body.mandataire_id);
    update(req.body.mandataire_id, { mesures_en_attente: MesureEnAttente })
      .then(mandataire => res.status(200).json(mandataire))
      .catch(error => next(error));
  }
);

router.use("/", require("./commentaires"));
router.use("/", require("./mandataireMesures"));
router.use("/", require("./serviceAntennes"));
router.use("/", require("./mandatairesEtablissements"));
router.use("/", require("./tis"));

module.exports = router;
