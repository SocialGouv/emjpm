exports.up = (knex) => {
  return knex.schema.createTable("city", (table) => {
    table.increments();
    table.string("code_postal").notNullable();
    table.string("ville").notNullable();
    table.string("latitude").notNullable();
    table.string("longitude").notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("city");
};
