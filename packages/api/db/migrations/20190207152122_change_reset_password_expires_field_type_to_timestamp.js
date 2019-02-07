exports.up = async knex =>
  knex.schema.alterTable("users", function(table) {
    table.timestamp("reset_password_expires").alter();
  });

exports.down = async knex => {
  return knex.schema.alterTable("users", function(table) {
    table.string("reset_password_expires").alter();
  });
};
