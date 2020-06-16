exports.up = function (knex) {
  return knex.schema.alterTable("tis", function (table) {
    table.dropColumn("admin");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("tis", function (table) {
    table.boolean("admin");
  });
};
