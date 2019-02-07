const bcrypt = require("bcryptjs");

exports.seed = (knex, Promise) => {
  return knex("users")
    .del()
    .then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync("individuel", salt);
      return Promise.join(
        knex("users").insert({
          username: "individuel",
          password: hash,
          type: "individuel",
          active: true,
          email: "individuel@individuel.com",
          nom: "nom individuel",
          prenom: "prenom individuel"
        })
      );
    })
    .then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync("prepose", salt);
      return Promise.join(
        knex("users").insert({
          username: "prepose",
          password: hash,
          type: "prepose",
          active: true,
          email: "prepose@prepose.com",
          nom: "nom prepose",
          prenom: "prenom prepose"
        })
      );
    })
    .then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync("service", salt);
      return Promise.join(
        knex("users").insert({
          username: "service",
          password: hash,
          type: "service",
          active: true,
          email: "individuel2@individuel.com",
          nom: "nom individuel2",
          prenom: "prenom individuel2"
        })
      );
    })
    .then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync("ti", salt);
      return Promise.join(
        knex("users").insert({
          username: "ti",
          password: hash,
          type: "ti",
          active: true,
          cabinet: "6D",
          email: "test@ti.com"
        })
      );
    })

    .then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync("admin", salt);
      return Promise.join(
        knex("users").insert({
          username: "admin",
          password: hash,
          type: "admin",
          active: true
        })
      );
    });
};
