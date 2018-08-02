exports.up = function(knex, Promise) {
  return knex.schema.dropTableIfExists("services_sieges");
};

exports.down = function(knex, Promise) {
  return Promise.resolve();
};
