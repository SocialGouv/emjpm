exports.up = async function (knex) {
  return knex.schema.alterTable("mandataires", function (table) {
    table.foreign("user_id").references("id").inTable("users");
  });
};

exports.down = async function (knex) {
  return knex.schema.alterTable("mandataires", function (table) {
    table.dropForeign("user_id");
  });
};
