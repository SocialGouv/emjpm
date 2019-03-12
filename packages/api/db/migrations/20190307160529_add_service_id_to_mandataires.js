exports.up = function(knex, Promise) {
  return knex.schema.alterTable("mandataires", function(table) {
    table.integer("service_id");
    table.string("email");
    table.string("nom");
    table.string("prenom");
  });
};

exports.down = function(knex, Promise) {
  return Promise.resolve();
};
