exports.up = function(knex, Promise) {
  return knex.schema.alterTable("mandataires", function(table) {
    table.string("telephone_portable");
    table.string("nom");
    table.string("prenom");
    table.boolean("secretariat");
    table.integer("nb_secretariat");
  });
};

exports.down = function(knex, Promise) {
  return Promise.resolve();
};
