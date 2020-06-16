exports.up = function (knex) {
  return knex.schema.alterTable("mesures", function (table) {
    table.integer("department_id");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("mesures", function (table) {
    table.dropColumn("department_id");
  });
};
