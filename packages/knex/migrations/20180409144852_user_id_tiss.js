exports.up = function(knex) {
  return knex.schema.alterTable("tis", function(table) {
    table.integer("user_id");
  });
};

/* eslint-disable no-unused-vars */
exports.down = function(knex, Promise) {
  return Promise.resolve();
};
/* eslint-enable no-unused-vars */
