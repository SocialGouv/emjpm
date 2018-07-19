const express = require("express");
const bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync();

const router = express.Router();
const knex = require("../db/knex");

const queries = require("../db/queries/inscription");

router.get("/tis", (req, res, next) =>
  queries.getTiByRegion().then(data => res.json(data))
);

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
                type, // TODO
                telephone,
                telephone_portable,
                email,
                adresse,
                code_postal,
                ville,
                latitude: 0, // TODO
                longitude: 0 // TODO
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
      // todo: send email admins ?
      return res.json({ success: true });
    })
    .catch(e => {
      console.log(e);
      return res.status(500).json({ success: false });
    });
});

module.exports = router;
