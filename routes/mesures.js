const express = require("express");

const router = express.Router();
const queries = require("../db/queries");
const fetch = require("isomorphic-fetch");

const { loginRequired } = require("../auth/_helpers");

router.get("/", loginRequired, async (req, res, next) => {
  if (req.user.type !== "ti") {
    return next(new Error(401));
  }
  const ti = await queries.getTiByUserId(req.user.id);
  queries
    .getAllMesuresByMandataires(ti.id)
    .then(mesures => res.status(200).json(mesures))
    .catch(error => next(error));
});

router.post("/filters", loginRequired, async (req, res, next) => {
  const ti = await queries.getTiByUserId(req.user.id);
  queries
    .getAllMesuresByMandatairesFilter(
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

router.get("/popup", loginRequired, async (req, res, next) => {
  const ti = await queries.getTiByUserId(req.user.id);
  queries
    .getAllMesuresByPopUp(ti.id)
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
          queries
            .getPostecode(
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
