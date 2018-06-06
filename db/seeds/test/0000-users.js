const bcrypt = require("bcryptjs");

exports.seed = (knex, Promise) => {
  return knex("users")
    .del()
    .then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync("johnson123", salt);
      return Promise.join(
        knex("users").insert({
          username: "jeremy",
          password: hash,
          type: "individuel",
          active: true
        })
      );
    })
    .then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync("bryant123", salt);
      return Promise.join(
        knex("users").insert({
          username: "kelly",
          password: hash,
          type: "prepose",
          active: true
        })
      );
    })
    .then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync("service1", salt);
      return Promise.join(
        knex("users").insert({
          username: "service1",
          password: hash,
          type: "service",
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
    })
    .then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync("ti1", salt);
      return Promise.join(
        knex("users").insert({
          username: "ti1",
          password: hash,
          type: "ti",
          active: true
        })
      );
    })
    .then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync("inactive", salt);
      return Promise.join(
        knex("users").insert({
          username: "inactive",
          password: hash,
          type: "prepose",
          active: false
        })
      );
    });
};
