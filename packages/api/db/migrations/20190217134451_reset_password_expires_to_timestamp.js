exports.up = function(knex, Promise) {
  return knex.schema.alterTable("users", function(t) {
    t.timestamp("reset_password_expires").alter();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("users", function(t) {
    t.string("reset_password_expires").alter();
  });
};
