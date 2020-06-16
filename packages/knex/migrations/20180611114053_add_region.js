exports.up = function (knex) {
  return knex.schema.createTable("regions", (table) => {
    table.increments("id");
    table.string("nom").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("regions");
};
