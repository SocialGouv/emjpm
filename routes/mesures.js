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

const { getTiByUserId } = require("../db/queries/tis");

/** @swagger
 * /mesures:
 *   get:
 *     description: get all mesures in a specific Ti
 *     produces:
 *       - application/json
 *   responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
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
/** @swagger
 * /mesures/filters:
 *   post:
 *     description: post to filters mesures by Ti map
 *     produces:
 *       - application/json
 *     requestBodies:
 *       description: A JSON object containing latitude and longitude
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               latNorthEast:
 *                 type: float
 *                 required: true
 *               latSouthWest:
 *                 type: float
 *                 required: true
 *               longNorthEast:
 *                 type: float
 *                 required: true
 *               longSouthWest:
 *                 type: float
 *                 required: true
 *      responses:
 *         200:
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 */
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


//ToDo: merge with get "mesures/"
/** @swagger
 * /mesures/popup:
 *   *   get:
 *     description: get all mesures in a specific Ti group by Post code
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: searchType
 *         description: filters mesures to apply to the list of mesures
 *         required: false
 *         schema:
 *           type: object
 *   responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
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

/** @swagger
 * /mandataires/getAllMesuresByTis:
 *   get:
 *     description: get mesures for a specific Tis
 *     produces:
 *       - application/json
 *   responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
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

/** @swagger
 * /mesurespopupMandataire:
 *   get:
 *     description: get mesures for mandataire map for a specific Tis
 *     produces:
 *       - application/json
 *   responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
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

/** @swagger
 * /mesures/codePostal:
 *   get:
 *     description: get all postcode from geo.api.gouv.fr
 *   responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
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
