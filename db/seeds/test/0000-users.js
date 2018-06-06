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
          type: "individuel"
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
          type: "admin"
        })
      );
    })
    .then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync("aaaaaa", salt);
      return Promise.join(
        knex("users").insert({
          username: "adrien1",
          password: hash,
          type: "admin"
        })
      );
    })
    .then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync("bbbbbb", salt);
      return Promise.join(
        knex("users").insert({
          username: "adrien2",
          password: hash,
          type: "admin"
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
          type: "ti"
        })
      );
    });
};
