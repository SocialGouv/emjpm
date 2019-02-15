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

const getSpecificUser = data =>
  knex
    .from("users")
    .where(data)
    .first();

const getCountByEmail = email =>
  knex("users")
    .count("id")
    .where("email", email)
    .first();

const updateResetPassword = (id, token, interval) =>
  updateUser(id, {
    reset_password_token: token,
    reset_password_expires: knex.raw(`now() + interval '${interval}'`)
  });

module.exports = {
  updateLastLogin,
  updateUser,
  getSpecificUser,
  getCountByEmail,
  updateResetPassword
};
