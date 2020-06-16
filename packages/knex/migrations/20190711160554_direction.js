exports.up = (knex) => {
  return knex.schema.createTable("direction", (table) => {
    table.increments();
    table.integer("region_id");
    table.integer("user_id");
    table.integer("department_id");
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("direction");
};
