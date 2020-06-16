exports.up = function (knex) {
  return knex.schema.createTable("mesures_import", (table) => {
    table.increments("id");
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("processed_at");
    table.jsonb("content");
    table.string("file_name").notNullable();
    table.integer("file_size").notNullable();
    table.string("file_type").notNullable();
    table.string("status").notNullable();
    table.integer("user_id").notNullable().references("id").inTable("users");
    table.integer("antenne_id").references("id").inTable("service_antenne");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("mesures_import");
};
