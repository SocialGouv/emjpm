exports.up = function(knex) {
  return knex.schema.alterTable(
    "enquete_reponses_agrements_formations",
    function(table) {
      table.integer("nb_mesures_dep_finance").nullable();
      table.integer("nb_mesures_dep_autres").nullable();
    }
  );
};

exports.down = function(knex) {
  return knex.schema.alterTable(
    "enquete_reponses_agrements_formations",
    function(table) {
      table.dropColumn("nb_mesures_dep_finance");
      table.dropColumn("nb_mesures_dep_autres");
    }
  );
};
