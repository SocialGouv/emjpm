const express = require("express");
const createError = require("http-errors");

const router = express.Router();
const fetch = require("isomorphic-fetch");

const { loginRequired, typeRequired } = require("../auth/_helpers");

const {
  getAllMesuresByMandataires,
  getAllMesuresByMandatairesFilter,
  getMesuresByGeolocalisation,
  getAllMesuresByTis,
  getAllMesuresByPopUpForMandataire
} = require("../db/queries/mesures");

const { getTiByUserId } = require("../db/queries/tis");

/** @swagger
 * /mesures:
 *   get:
 *     tags:
 *       - mesure
 *     description: get all mesures for a specific Ti
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return all mesures for a specific Ti
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/", typeRequired("ti"), async (req, res, next) => {
  try {
    const ti = await getTiByUserId(req.user.id);
    if (!ti) {
      throw createError.NotFound(`Ti of user "${req.user.email}" not Found`);
    }
    const mesures = await getAllMesuresByMandataires(ti.id);
    res.json(mesures);
  } catch (e) {
    next(e);
  }
});

// todo : transform into get
/** @swagger
 * /mesures/filters:
 *   post:
 *     tags:
 *       - mesure
 *     description: Filters mesures by geolocalisation
 *     produces:
 *       - application/json
 *     requestBody:
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
 *     responses:
 *       200:
 *         description: Return mesures filtered by localisation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.post("/filters", loginRequired, async (req, res, next) => {
  try {
    const ti = await getTiByUserId(req.user.id);
    if (!ti) {
      throw createError.NotFound(`Ti of user "${req.user.email}" not Found`);
    }
    const mesures = await getAllMesuresByMandatairesFilter(
      ti.id,
      req.body.latNorthEast,
      req.body.latSouthWest,
      req.body.longNorthEast,
      req.body.longSouthWest
    );
    res.json(mesures);
  } catch (e) {
    next(e);
  }
});

//ToDo: merge with get "mesures/" and rename
/** @swagger
 * /mesures/popup:
 *  get:
 *    tags:
 *       - mesure
 *    description: get all mesures for a specific Ti
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: searchType
 *        required: false
 *        schema:
 *          type: object
 *    responses:
 *      200:
 *        description: Return all mesures
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */
router.get("/popup", typeRequired("ti"), async (req, res, next) => {
  try {
    const ti = await getTiByUserId(req.user.id);
    if (!ti) {
      throw createError.NotFound(`Ti of user "${req.user.email}" not Found`);
    }
    const mesures = await getMesuresByGeolocalisation(
      ti.id,
      req.query.searchType
    );
    res.json(mesures);
  } catch (e) {
    next(e);
  }
});

/** @swagger
 * /mesures/getAllMesuresByTis:
 *   get:
 *     tags:
 *       - mesure
 *     description: get mesures for a specific Ti
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return mesures
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get(
  "/getAllMesuresByTis",
  typeRequired("ti"),
  async (req, res, next) => {
    try {
      const ti = await getTiByUserId(req.user.id);
      if (!ti) {
        throw createError.NotFound(`Ti of user "${req.user.email}" not Found`);
      }
      const mesures = await getAllMesuresByTis(ti.id);
      res.json(mesures);
    } catch (e) {
      next(e);
    }
  }
);

// Todo : rename and merge
/** @swagger
 * /mesurespopupMandataire:
 *   get:
 *     tags:
 *       - mesure
 *     description: get markers for mandataire for a specific Ti
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/popupMandataire", loginRequired, async (req, res, next) => {
  try {
    const ti = await getTiByUserId(req.user.id);
    const mesures = await getAllMesuresByPopUpForMandataire(ti.id);
    res.json(mesures);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
