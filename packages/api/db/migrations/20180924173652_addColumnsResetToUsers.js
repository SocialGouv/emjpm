exports.up = function(knex) {
  return knex.schema.alterTable("users", function(table) {
    table.string("reset_password_token");
    table.timestamp("reset_password_expires");
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable("users", function(table) {
    table.dropColumn("reset_password_token");
    table.dropColumn("reset_password_expires");
  });
};
