exports.up = (knex, Promise) => {
  return knex.schema.createTable("tis", table => {
    table.increments();
    table.string("etablissement").notNullable();
    table.string("email").notNullable();
    table.string("code_postal").notNullable();
    table.string("ville").notNullable();
    table.string("telephone").notNullable();
    table.float("latitude").notNullable();
    table.float("longitude").notNullable();
    table
      .boolean("admin")
      .notNullable()
      .defaultTo(false);
    table
      .timestamp("created_at")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable("tis");
};
