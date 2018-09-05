const express = require("express");

const router = express.Router();
const fetch = require("isomorphic-fetch");

const { loginRequired, typeRequired } = require("../auth/_helpers");

const {
  getAllMesuresByMandataires,
  getAllMesuresByMandatairesFilter,
  getAllMesuresByPopUp,
  getAllMesuresByTis,
  getAllMesuresByPopUpForMandataire,
  getPostecode
} = require("../db/queries/mesures");

const {getTiByUserId} = require("../db/queries/tis")

router.get("/", typeRequired("ti"), async (req, res, next) => {
  if (req.user.type !== "ti") {
    return next(new Error(401));
  }
  const ti = await getTiByUserId(req.user.id);
  if (!ti) {
    return next(new Error(401));
  }
  getAllMesuresByMandataires(ti.id)
    .then(mesures => res.status(200).json(mesures))
    .catch(error => next(error));
});

// todo : make it work for real
router.post("/filters", loginRequired, async (req, res, next) => {
  const ti = await getTiByUserId(req.user.id);
  if (!ti) {
    return next(new Error(401));
  }
  getAllMesuresByMandatairesFilter(
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

router.get("/popup", typeRequired("ti"), async (req, res, next) => {
  const ti = await getTiByUserId(req.user.id);
  if (!ti) {
    return next(new Error(401));
  }
  getAllMesuresByPopUp(ti.id, req.query.searchType)
    .then(function(mesures) {
      res.status(200).json(mesures);
    })
    .catch(function(error) {
      console.log(error);
      throw error;
      next(error);
    });
});

router.get(
  "/getAllMesuresByTis",
  typeRequired("ti"),
  async (req, res, next) => {
    const ti = await getTiByUserId(req.user.id);
    if (!ti) {
      return next(new Error(401));
    }
    getAllMesuresByTis(ti.id)
      .then(function(mesures) {
        res.status(200).json(mesures);
      })
      .catch(function(error) {
        console.log(error);
        throw error;
        next(error);
      });
  }
);

router.get("/popupMandataire", loginRequired, async (req, res, next) => {
  const ti = await getTiByUserId(req.user.id);
  getAllMesuresByPopUpForMandataire(ti.id)
    .then(function(mesures) {
      res.status(200).json(mesures);
    })
    .catch(function(error) {
      console.log(error);
      throw error;
      next(error);
    });
});

router.get("/codePostal", async (req, res, next) => {
  url =
    "https://geo.api.gouv.fr/communes?fields=nom,code,codesPostaux,centre,population&boost=population";
  fetch(url)
    .then(response => response.json())
    .then(json => {
      json.map(code =>
        code.codesPostaux.map(codePos =>
          getPostecode(
            codePos,
            code.centre.coordinates[1],
            code.centre.coordinates[0]
          )
            .then(function(mesures) {
              res.status(200).json(mesures);
            })
            .catch(function(error) {
              throw error;
              next(error);
            })
        )
      );
    });
});

module.exports = router;
