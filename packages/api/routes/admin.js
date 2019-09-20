const { typeRequired } = require("../auth/_helpers");

const express = require("express");
const createError = require("http-errors");

const router = express.Router();

const queries = require("../db/queries/admin");
const whitelist = require("../db/queries/whitelist");

const { getSpecificUser } = require("../db/queries/users");
const { validationEmail } = require("../email/validation");
/**
 * @swagger

 * security:
 *   - cookieAuth: []
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: connect.sid
 *   requestBodies:
 *     ActiveMandataireBody:
 *       description: A JSON object containing user active status
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               active:
 *                 type: boolean
 *                 required: true
 *   schemas:
 *     MandataireAdmin:
 *       type: object
 *       properties:
 *         id:
 *           description: ID du user
 *           type: integer
 *         type:
 *           description: Type de user
 *           deprecated: true
 *           type: string
 *           enum:
 *             - preposes
 *             - individuels
 *             - services
 *         nom:
 *           description: Nom du mandataire
 *           type: string
 *         prenom:
 *           description: Prénom du mandataire
 *           type: string
 *         code_postal:
 *           description: Code postal du mandataire
 *           type: string
 *         created_at:
 *           description: Date de création du user
 *           type: datetime
 *         last_login:
 *           description: Date de dernière connextion du user
 *           type: datetime
 *
 *     SuccessResponse:
 *       description: conformation de succes
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           value: true
 *         message:
 *           type: string
 *           value: true
 *
 *     ActiveMandataireBody:
 *       description: changement etat du mandataire
 *       type: object
 *       properties:
 *         active:
 *           type: boolean
 *           value: true
 *
 * @swagger
 * /admin/mandataires:
 *   get:
 *     tags:
 *       - admin
 *     description: get list of mandataires for admin
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: query
 *         description: filters to apply to the list. ex `?users.active=true`
 *         required: false
 *         schema:
 *           type: object
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MandataireAdmin'
 */
router.get("/mandataires", typeRequired("admin"), async (req, res, next) => {
  try {
    const mandataires = await queries.getUsers({ filters: req.query });
    res.json(mandataires);
  } catch (e) {
    next(e);
  }
});

router.get("/directions", typeRequired("admin"), async (req, res, next) => {
  try {
    const directions = await queries.getDirections({ filters: req.query });
    res.json(directions);
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /admin/tis:
 *   get:
 *     tags:
 *       - admin
 *     description: get list of users of Ti for admin
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: users.active
 *         description: filters to apply to the list. ex `?users.active=true`
 *         required: false
 *         schema:
 *           type: object
 *     responses:
 *       200:
 *         description: return list of users of Ti for admin
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get("/tis", typeRequired("admin"), async (req, res, next) => {
  try {
    const users = await queries.getTis({ filters: req.query });
    res.json(users);
  } catch (e) {
    next(e);
  }
});

const USER_WRITE_PROPERTIES = ["active"];

/**
 * @swagger
 * /admin/user/:id:
 *   put:
 *     tags:
 *       - admin
 *     description: update some user data
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: user id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       $ref: '#/components/requestBodies/ActiveMandataireBody'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */
router.put("/user/:userId", typeRequired("admin"), async (req, res, next) => {
  try {
    // whitelist input data
    const cleanedBody = whitelist(req.body, USER_WRITE_PROPERTIES);

    const wasUpdated = await queries.updateUser({
      id: req.params.userId,
      ...cleanedBody
    });

    // FIXME(douglasduteil): the user we try to path might not exits...
    // We might want to ensure that the user exist before trying to update it...
    const user = await getSpecificUser({ id: req.params.userId });

    if (!user) {
      throw createError.NotFound(`User "${req.params.userId}" not Found`);
    }

    if (!wasUpdated) {
      // FIXME(douglasduteil): testing if updated is undefined is an antipattern
      // IMO we shouldn't test if updated is undefined as we should fail before.
      // This PATCH on the use "active" state should be rethink...

      throw createError.UnprocessableEntity("Not 'active' field to patch.");
    }

    await validationEmail(user.email, `${process.env.APP_URL}`);

    res.json(user);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
