const knex = require("../knex.js");
const whitelist = require("./whitelist");

const ALLOWED_FILTERS = ["users.active", "users.type"];

const getDirections = ({ filters = {}, offset = 0, limit = 50 } = {}) =>
  knex("users")
    .select(
      "users.id",
      "users.nom",
      "users.prenom",
      "users.email",
      "users.type",
      "users.active",
      "users.created_at",
      "users.last_login"
    )
    .where(whitelist(filters, ALLOWED_FILTERS))
    .where({ "users.type": "direction" })
    .orderBy("users.id")
    .offset(offset)
    .limit(limit);

const getUsers = ({ filters = {}, offset = 0, limit = 50 } = {}) =>
  knex("users")
    .select(
      "users.id",
      "users.nom",
      "users.prenom",
      "users.email",
      "users.type",
      "users.active",
      "users.created_at",
      "users.last_login"
    )
    .where(whitelist(filters, ALLOWED_FILTERS))
    .whereIn("users.type", ["individuel", "prepose", "service"])
    .orderBy("users.id")
    .offset(offset)
    .limit(limit);

const getTis = ({ filters = {}, offset = 0, limit = 50 } = {}) =>
  knex("users")
    .select(
      "users.id",
      "users.type",
      "users.cabinet",
      "users.email",
      "users.nom",
      "users.prenom",
      "users.active",
      "users.created_at",
      "users.last_login"
    )
    .where({ "users.type": "ti" })
    .where(whitelist(filters, ALLOWED_FILTERS))
    .orderBy("id")
    .offset(offset)
    .limit(limit);

const updateUser = ({ id, active }) => {
  if (typeof active === "undefined") {
    // skip if no data to update
    return Promise.resolve();
  }
  return knex("users")
    .where({ id })
    .update({ active });
};

module.exports = {
  getUsers,
  getDirections,
  updateUser,
  getTis
};
