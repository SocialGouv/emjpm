const express = require("express");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const salt = bcrypt.genSaltSync();

const router = express.Router();
const knex = require("../db/knex");

const queries = require("../db/queries/inscription");
const { getTiById } = require("../db/queries/tis");
const { inscriptionEmail } = require("../email/inscription");
const { getCountByEmail } = require("../db/queries/users");

const getTisNames = async tis => {
  const getEtablissementByTi = id =>
    getTiById(id).then(json => json.etablissement);
  if (tis) {
    const tiNames = (await Promise.all(tis.map(getEtablissementByTi))).join(
      ", "
    );
    return tiNames;
  }
};

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

router.get("/tis", async (req, res, next) => {
  try {
    const data = await queries.getTiByRegion();
    res.json(data);
  } catch (e) {
    next(e);
  }
});

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
router.post("/mandataires", async (req, res, next) => {
  try {
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
      tis,
      dispo_max
    } = req.body;

    if (pass1 !== pass2 || username.trim() === "") {
      throw createError.UnprocessableEntity(
        "Les mots de passe ne sont pas conformes"
      );
    }

    const userExists = (await getCountByEmail(email)).count > 0;

    if (userExists) {
      throw createError.Conflict("Un compte avec cet email existe déjà");
    }

    await knex.transaction(async function(trx) {
      // create user
      try {
        if (type === "service") {
          const serviceId = await queries.createService(
            {
              etablissement,
              nom,
              prenom,
              email,
              telephone,
              adresse,
              code_postal,
              ville,
              dispo_max
            },
            trx
          );
          await queries.createUser(
            {
              username,
              type,
              nom,
              prenom,
              email,
              service_id: serviceId[0],
              password: bcrypt.hashSync(pass1, salt),
              active: false
            },
            trx
          );
        } else {
          const userId = await queries.createUser(
            {
              username,
              type,
              nom,
              prenom,
              email,
              password: bcrypt.hashSync(pass1, salt),
              active: false
            },
            trx
          );

          await queries.createMandataire(
            {
              user_id: userId[0],
              etablissement,
              telephone,
              telephone_portable,
              adresse,
              code_postal,
              ville
            },
            trx
          );
          if (!tis || tis.length === 0) {
            return true;
          }
          await Promise.all(
            tis.map(ti_id =>
              queries.createUserTi(
                {
                  user_id: userId[0],
                  ti_id
                },
                trx
              )
            )
          );
        }
        await trx.commit();
      } catch (e) {
        await trx.rollback(e);
      }
    });

    const tiNames = await getTisNames(tis);

    await inscriptionEmail(nom, prenom, email, code_postal, type, tiNames);

    res.json({ success: true });
  } catch (e) {
    // see https://www.postgresql.org/docs/9.2/errcodes-appendix.html
    const PQ_UNIQUE_VIOLATION_ERROR_CODE = String(23505);

    switch (e.code) {
      case PQ_UNIQUE_VIOLATION_ERROR_CODE:
        next(createError.Conflict(e.detail));
        break;

      default:
        next(e);
        break;
    }
  }
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
router.post("/tis", (req, res) => {
  const {
    username,
    pass1,
    pass2,
    type,
    email,
    tis,
    cabinet,
    nom,
    prenom
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
            cabinet,
            nom,
            prenom,
            email,
            password: bcrypt.hashSync(pass1, salt),
            active: false
          },
          trx
        )
        .then(([user_id]) => {
          if (!tis || tis.length === 0) {
            return true;
          }
          return Promise.all(
            tis.map(ti_id =>
              queries.createUserTi(
                {
                  user_id,
                  ti_id
                },
                trx
              )
            )
          );
        })
    )
    .then(() => getTisNames(tis))
    .then(tis => {
      return inscriptionEmail(nom, prenom, email, null, type, tis);
    })
    .then(() => {
      return res.json({ success: true });
    })
    .catch(() => {
      return res.status(500).json({
        success: false
      });
    });
});
module.exports = router;
