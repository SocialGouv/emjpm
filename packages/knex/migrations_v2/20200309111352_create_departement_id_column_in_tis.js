exports.up = function (knex) {
  return knex.schema.table("tis", function (t) {
    t.integer("departement_id");
    t.foreign("departement_id").references("id").inTable("departements");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("tis", function (table) {
    table.dropForeign("departement_id");
    table.dropColumn("departement_id");
  });
};
