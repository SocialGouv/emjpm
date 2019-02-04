exports.up = function(knex) {
  return knex.schema.alterTable("users", function(table) {
    table.boolean("service");
  });
};

exports.down = function (knex, Promise) {
  return Promise.resolve();
};
