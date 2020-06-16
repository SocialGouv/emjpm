exports.up = function (knex) {
  return knex.schema.alterTable("mesures", function (table) {
    table
      .integer("magistrat_id")
      .references("id")
      .inTable("magistrat")
      .nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("mesures", function (table) {
    table.dropColumn("magistrat_id");
  });
};
