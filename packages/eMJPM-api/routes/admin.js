const { typeRequired } = require("../auth/_helpers");

const express = require("express");

const router = express.Router();

const queries = require("../db/queries/admin");
const whitelist = require("../db/queries/whitelist");

/**
 * @swagger
 * components:
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
 *
 *   schemas:
 *     Mandataire:
 *       type: object
 *       properties:
 *         id:
 *           description: ID du mandataire
 *           type: integer
 *         type:
 *           description: Type de mandataire
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
 *           description: Date de création du mandataire
 *           type: datetime
 *         last_login:
 *           description: Date de dernière connextion du mandataire
 *           type: datetime
 *
 *     SuccessResponse:
 *       description: conformation de succes
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
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
 *                 $ref: '#/components/schemas/Mandataire'
 */
router.get("/mandataires", typeRequired("admin"), async (req, res, next) => {
  const mandataires = await queries.getMandataires({ filters: req.query });
  res.json(mandataires);
});

/**
 * @swagger
 * /admin/user/:id:
 *   put:
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
const USER_WRITE_PROPERTIES = ["active"];

router.put("/user/:userId", typeRequired("admin"), (req, res, next) => {
  // whitelist input data
  const cleanedBody = whitelist(req.body, USER_WRITE_PROPERTIES);
  queries
    .updateUser({
      id: req.params.userId,
      ...cleanedBody
    })
    .then(updated => {
      res.json({
        success: !!updated
      });
    });
});

module.exports = router;
