exports.up = function(knex, Promise) {
  return knex.schema.alterTable("mesures", function(table) {
    table.string("status");
  });
};

exports.down = function(knex, Promise) {
  return Promise.resolve();
};
