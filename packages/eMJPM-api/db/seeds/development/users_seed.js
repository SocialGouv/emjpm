const bcrypt = require("bcryptjs");

exports.seed = function(knex, Promise) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync("johnson123", salt);
  return knex("users")
    .del()
    .then(function() {
      return knex("users").insert({
        username: "ad@ad.com",
        password: hash,
        admin: false,
        mandataire: true
      });
    });
};
