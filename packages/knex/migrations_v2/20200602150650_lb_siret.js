exports.up = function(knex) {
  return knex.schema.alterTable("lb_users", table => {
    table.string("siret").unique();
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable("lb_users", table => {
    table.dropColumn("siret");
  });
};
