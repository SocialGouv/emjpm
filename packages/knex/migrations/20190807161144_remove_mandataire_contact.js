exports.up = async function (knex) {
  return knex.schema.alterTable("mandataires", function (table) {
    table.dropColumn("contact_email");
    table.dropColumn("contact_nom");
    table.dropColumn("contact_prenom");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("mandataires", function (table) {
    table.string("contact_email");
    table.string("contact_nom");
    table.string("contact_prenom");
  });
};
