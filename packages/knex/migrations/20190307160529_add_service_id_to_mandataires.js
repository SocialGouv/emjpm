exports.up = function (knex) {
  return knex.schema.alterTable("mandataires", function (table) {
    table.integer("service_id");
    table.string("contact_email");
    table.string("contact_nom");
    table.string("contact_prenom");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("mandataires", function (table) {
    table.dropColumn("service_id");
    table.dropColumn("contact_email");
    table.dropColumn("contact_nom");
    table.dropColumn("contact_prenom");
  });
};
