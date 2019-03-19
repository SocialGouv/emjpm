exports.up = function(knex, Promise) {
  return knex.schema.alterTable("mandataires", function(table) {
    table.integer("service_id");
    table.string("contact_email");
    table.string("contact_nom");
    table.string("contact_prenom");
  });
};

exports.down = function(knex, Promise) {
  return Promise.resolve();
};
