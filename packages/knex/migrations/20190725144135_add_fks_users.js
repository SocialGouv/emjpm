exports.up = async function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.unique("service_id");
    table.foreign("service_id").references("id").inTable("services");
  });
};

exports.down = async function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.dropForeign("service_id");
    table.dropUnique("service_id");
  });
};
