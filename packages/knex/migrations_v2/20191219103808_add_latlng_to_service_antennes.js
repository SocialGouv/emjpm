exports.up = async function (knex) {
  await knex.schema.alterTable("service_antenne", function (table) {
    table.float("latitude");
    table.float("longitude");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("service_antenne", function (table) {
    table.dropColumn("latitude");
    table.dropColumn("longitude");
  });
};
