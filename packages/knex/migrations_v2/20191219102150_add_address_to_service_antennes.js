exports.up = async function (knex) {
  await knex.schema.alterTable("service_antenne", function (table) {
    table.string("address");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("service_antenne", function (table) {
    table.dropColumn("address");
  });
};
