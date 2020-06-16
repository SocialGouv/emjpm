exports.up = function (knex) {
  return knex.schema.renameTable("serviceAntennes", "service_antennes");
};

exports.down = function (knex) {
  return knex.schema.renameTable("service_antennes", "serviceAntennes");
};
