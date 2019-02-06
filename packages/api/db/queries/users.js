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
    .innerJoin("mandataires", "mandataires.user_id", "users.id")
    .where({ "users.id": id })
    .first();

const updateResetPassword = (id, token, interval) =>
  updateUser(id, {
    reset_password_token: token,
    reset_password_expires: knex.raw(`now() + interval '${interval}'`)
  });

module.exports = {
  updateLastLogin,
  updateResetPassword,
  updateUser,
  user
};
