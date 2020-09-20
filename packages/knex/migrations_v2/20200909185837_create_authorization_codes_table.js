exports.up = async function (knex) {
  return knex.schema.createTable("authorization_codes", (table) => {
    table.increments("id");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.string("code");
    table.string("redirect_uri");
    table
      .integer("client_id")
      .references("id")
      .inTable("editors")
      .notNullable();
    table.integer("user_id").references("id").inTable("users").notNullable();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable("authorization_codes");
};
