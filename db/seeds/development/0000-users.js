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
          active: true
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
          active: true
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
          active: true
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
          active: true
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
