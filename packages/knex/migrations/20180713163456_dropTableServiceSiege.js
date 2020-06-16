exports.up = function (knex) {
  return knex.schema.dropTableIfExists("services_sieges");
};

exports.down = function () {
  return Promise.resolve();
};
