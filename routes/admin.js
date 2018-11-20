const { typeRequired } = require("../auth/_helpers");

const express = require("express");

const router = express.Router();

const queries = require("../db/queries/admin");
const whitelist = require("../db/queries/whitelist");

const { user } = require("../db/queries/users");
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
  const mandataires = await queries.getMandataires({ filters: req.query });
  res.json(mandataires);
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
  const users = await queries.getTis({ filters: req.query });
  res.json(users);
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
  // whitelist input data
  const cleanedBody = whitelist(req.body, USER_WRITE_PROPERTIES);
  queries
    .updateUser({
      id: req.params.userId,
      ...cleanedBody
    })
    .then(updated => {
      user(req.params.userId).then(json =>
        validationEmail(json.email, `${process.env.APP_URL}`)
      );
      return updated;
    })
    .then(updated => {
      res.json({
        success: !!updated
      });
    });
});

module.exports = router;
