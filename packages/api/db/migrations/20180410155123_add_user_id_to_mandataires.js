exports.up = function(knex, Promise) {
  return knex.schema.alterTable("mandataires", function(table) {
    table.integer("user_id");
  });
};

exports.down = function(knex, Promise) {
  return Promise.resolve();
};
