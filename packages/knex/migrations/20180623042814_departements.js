exports.up = function (knex) {
  return knex.schema.createTable("departements", (table) => {
    table.increments("id");
    table.integer("id_region").unsigned();
    table.string("code").notNullable();
    table.string("nom").notNullable();
    table.foreign("id_region").references("regions.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("departements");
};
