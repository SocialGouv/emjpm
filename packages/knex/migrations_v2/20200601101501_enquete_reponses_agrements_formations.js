exports.up = function(knex) {
  return knex.schema.alterTable(
    "enquete_reponses_agrements_formations",
    function(table) {
      table
        .integer("niveau_qualification")
        .nullable()
        .alter(); // string => integer
    }
  );
};

exports.down = function(knex) {
  return knex.schema.alterTable(
    "enquete_reponses_agrements_formations",
    function(table) {
      table
        .string("niveau_qualification")
        .nullable()
        .alter(); // integer => string
    }
  );
};
