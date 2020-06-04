exports.up = function(knex) {
  return knex.schema.alterTable(
    "enquete_reponses_agrements_formations",
    function(table) {
      table
        .float("cnc_heures_formation")
        .nullable()
        .alter(); // integer => float
    }
  );
};

exports.down = function(knex) {
  return knex.schema.alterTable(
    "enquete_reponses_agrements_formations",
    function(table) {
      table
        .integer("cnc_heures_formation")
        .nullable()
        .alter(); // float => integer
    }
  );
};
