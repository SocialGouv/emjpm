const express = require("express");
const bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync();

const router = express.Router();
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
  // todo: transaction
  // create user
  return queries
    .createUser({
      username,
      type,
      password: bcrypt.hashSync(pass1, salt),
      active: false
    })
    .then(([user_id]) =>
      // create mandataire
      queries
        .createMandataire({
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
        })
        .then(([mandataire_id]) => {
          // create tis
          if (!req.body.tis || req.body.tis.length === 0) {
            return true;
          }
          return Promise.all(
            req.body.tis.map(ti_id =>
              queries.createMandataireTi({
                mandataire_id,
                ti_id
              })
            )
          ).catch(console.log);
        })
    )
    .then(() => {
      // todo: send email admins ?
      return res.json({ success: true });
    })
    .catch(() => {
      return res.status(500).json({ success: false });
    });
});

module.exports = router;
