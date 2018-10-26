const knex = require("../knex.js");

// update users last login
const updateLastLogin = id =>
  knex("users")
    .where({ id })
    .update({
      last_login: new Date().toISOString()
    });

const updateUser = (id, data) =>
  knex("users")
    .where({ id })
    .update(data);

const user = id =>
  knex("users")
    .where({ id })
    .first();

module.exports = {
  updateLastLogin,
  updateUser,
  user
};
