const express = require("express");
const bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync();

const router = express.Router();
const knex = require("../db/knex");

const queries = require("../db/queries/inscription");
const { inscriptionEmail } = require("../email/inscription");
/**
 * @swagger
 *
 * components:
 *   schemas:
 *     InscriptionTi:
 *       type: object
 *       properties:
 *         id:
 *           description: id du TI
 *           type: integer
 *         region:
 *           description: région du TI
 *           type: string
 *         nom:
 *           description: nom du TI
 *           type: string
 *   requestBodies:
 *     InscriptionMandataire:
 *       description: A JSON object containing mandataire parameters
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: true
 *             properties:
 *               username:
 *                 description: sera utilisé pour le login du mandataire
 *                 type: string
 *                 required: true
 *               nom:
 *                 type: string
 *                 required: true
 *               prenom:
 *                 type: string
 *                 required: true
 *               telephone:
 *                 type: string
 *                 required: true
 *               telephone_portable:
 *                 type: string
 *                 required: false
 *               email:
 *                 type: string
 *                 required: true
 *               adresse:
 *                 type: string
 *                 required: true
 *               code_postal:
 *                 type: string
 *                 required: true
 *               ville:
 *                 type: string
 *                 required: true
 *               etablissement:
 *                 type: string
 *                 required: false
 *               pass1:
 *                 type: string
 *                 required: true
 *               pass2:
 *                 type: string
 *                 required: true
 *               type:
 *                 description: Type de l'utilisateur
 *                 type: string
 *                 required: true
 *                 enum: ["prepose", "individuel", "service"]
 *               tis:
 *                 description: ID des tribunaux d'instance ou inscrire le mandataire
 *                 type: array
 *                 required: true
 *                 items:
 *                   type: integer
 *     InscriptionTi:
 *       description: A JSON object containing ti parameters
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: true
 *             properties:
 *               username:
 *                 description: sera utilisé pour le login du ti
 *                 type: string
 *                 required: true
 *               email:
 *                 type: string
 *                 required: true
 *               cabinet:
 *                 type: string
 *                 required: false
 *               pass1:
 *                 type: string
 *                 required: true
 *               pass2:
 *                 type: string
 *                 required: true
 *               type:
 *                 description: Type de l'utilisateur
 *                 type: string
 *                 required: true
 *                 enum: ["ti"]
 *               tis:
 *                 description: ID des tribunaux d'instance ou inscrire le user
 *                 type: array
 *                 required: true
 *                 items:
 *                   type: integer
 *     Login:
 *       description: A JSON object containing user credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 */

/**
 * @swagger
 * /inscription/tis:
 *   get:
 *     tags:
 *       - register
 *     description: Retourne la liste des TIs disponibles pour l'inscription
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InscriptionTi'
 */
router.get("/tis", (req, res, next) =>
  queries.getTiByRegion().then(data => res.json(data))
);

/**
 * @swagger
 * /inscription/mandataires:
 *   post:
 *     tags:
 *       - register
 *     description: Créé un nouveau mandataire inactif
 *     produces:
 *       - application/json
 *     requestBody:
 *       $ref: '#/components/requestBodies/InscriptionMandataire'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             $ref: "#/components/schemas/SuccessResponse"
 *
 */
router.post("/mandataires", (req, res, next) => {
  const {
    username,
    etablissement,
    pass1,
    pass2,
    type, // TODO
    nom,
    prenom,
    telephone,
    telephone_portable,
    email,
    adresse,
    code_postal,
    ville,
    tis
  } = req.body;

  if (pass1 !== pass2 || username.trim() === "") {
    return res.status(500).json({ success: false });
  }

  knex
    .transaction(trx =>
      // create user
      queries
        .createUser(
          {
            username,
            type,
            password: bcrypt.hashSync(pass1, salt),
            active: false
          },
          trx
        )
        .then(([user_id]) => {
          // create mandataire
          return queries
            .createMandataire(
              {
                user_id,
                etablissement,
                nom,
                prenom,
                telephone,
                telephone_portable,
                email,
                adresse,
                code_postal,
                ville
              },
              trx
            )
            .then(([mandataire_id]) => {
              // create tis
              if (!tis || tis.length === 0) {
                return true;
              }
              return Promise.all(
                tis.map(ti_id =>
                  queries.createMandataireTi(
                    {
                      mandataire_id,
                      ti_id
                    },
                    trx
                  )
                )
              );
            });
        })
    )
    .then(() => {
      return inscriptionEmail(`${process.env.APP_URL}`);
    })
    .then(() => {
      return res.json({ success: true });
    })
    .catch(e => {
      console.log(e);
      return res.status(500).json({ success: false });
    });
});

/**
 * @swagger
 * /inscription/tis:
 *   post:
 *     tags:
 *       - register
 *     description: Créé un nouveau user pour un ti
 *     produces:
 *       - application/json
 *     requestBody:
 *       $ref: '#/components/requestBodies/InscriptionTi'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             $ref: "#/components/schemas/SuccessResponse"
 *
 */
router.post("/tis", (req, res, next) => {
  const { username, pass1, pass2, type, email, tis, cabinet } = req.body;

  if (pass1 !== pass2 || username.trim() === "") {
    return res.status(500).json({ success: false });
  }

  knex
    .transaction(trx =>
      // create user
      queries
        .createUser(
          {
            username,
            type,
            password: bcrypt.hashSync(pass1, salt),
            active: false
          },
          trx
        )
        .then(([user_id]) => {
          // create mandataire
          if (!tis || tis.length === 0) {
            return true;
          }
          return Promise.all(
            tis.map(ti_id =>
              queries.createUserTi(
                {
                  user_id,
                  ti_id,
                  cabinet,
                  email
                },
                trx
              )
            )
          );
        })
    )
    .then(() => {
      return inscriptionEmail(`${process.env.APP_URL}`);
    })
    .then(() => {
      return res.json({ success: true });
    })
    .catch(e => {
      console.log(e);
      return res.status(500).json({ success: false });
    });
});
module.exports = router;
