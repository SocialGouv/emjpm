exports.up = function (knex) {
  return knex.schema.alterTable("services", function (table) {
    table.string("information");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("services", function (table) {
    table.dropColumn("information");
  });
};
