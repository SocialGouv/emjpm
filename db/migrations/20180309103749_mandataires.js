exports.up = function(knex, Promise) {
  return knex.schema.createTable("mandataires", function(table) {
    table.increments();
    table.string("etablissement").notNullable();
    table.string("email").notNullable();
    table.string("type").notNullable();
    table.string("code_postal").notNullable();
    table.string("ville").notNullable();
    table.string("telephone").notNullable();
    table.string("tribunal_instance").notNullable();
    table.float("latitude").notNullable();
    table.float("longitude").notNullable();
    table.string("adresse").notNullable();
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
  return knex.schema.dropTable("mandataires");
};
