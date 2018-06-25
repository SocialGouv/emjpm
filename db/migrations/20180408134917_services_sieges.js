exports.up = function(knex, Promise) {
  return knex.schema.createTable("services_sieges", function(table) {
    table.increments();
    table.string("etablissement");
    table.string("email");
    table.string("type");
    table.string("code_postal");
    table.string("ville");
    table.string("telephone");
    table.string("tribunal_instance");
    table.float("latitude");
    table.float("longitude");
    table.string("adresse");
    table.integer("capacite");
    table.integer("disponibilite");
    table.integer("dispo_max");
    table.integer("curatelle");
    table.integer("sauvegarde");
    table.integer("curatelle_renforce");
    table.string("referent");
    table.string("commentaire");
    table.string("specilite");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("services_sieges");
};
