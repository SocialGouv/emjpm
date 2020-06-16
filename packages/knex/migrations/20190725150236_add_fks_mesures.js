exports.up = async function (knex) {
  return knex.schema.alterTable("mesures", function (table) {
    table
      .foreign("etablissement_id")
      .references("id")
      .inTable("etablissements");
  });
};

exports.down = async function (knex) {
  return knex.schema.alterTable("mesures", function (table) {
    table.dropForeign("etablissement_id");
  });
};
