exports.up = function (knex) {
  return knex.schema.renameTable("service_admin", "service_members");
};

exports.down = function (knex) {
  return knex.schema.renameTable("service_members", "service_admin");
};
