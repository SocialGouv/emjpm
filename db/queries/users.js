const knex = require("../knex.js");

// update users last login
const updateLastLogin = id =>
  knex("users")
    .where({ id })
    .update({
      last_login: new Date().toISOString()
    });

const updateUsers = (id, data) =>
  knex("users")
    .where({ id })
    .update(data);

module.exports = {
  updateLastLogin,
  updateUsers
};
