exports.up = function(knex) {
  return knex.schema.alterTable("tis", function(table) {
    table.integer("user_id");
  });
};

exports.down = function(knex, Promise) {
  return Promise.resolve();
};
