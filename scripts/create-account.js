const knex = require("./db/knex");
const bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync();
const hash = bcrypt.hashSync("testeur", salt);

knex
  .transaction(trx =>
    trx
      .insert({
        username: "testeur",
        email: "testeur@testeur.com",
        password: hash,
        type: "individuel",
        active: true
      })
      .into("users")
      .returning("id")
      .then(
        ([user_id]) =>
          console.log("iooo 2") ||
          trx
            .insert({
              user_id,
              code_postal: "89100",
              etablissement: "",
              telephone: "",
              adresse: "",
              ville: "test ville"
            })
            .into("mandataires")
            .returning("id")
      )
  )
  .then(_ => console.log("done"))
  .catch(err => console.log("err", err));
