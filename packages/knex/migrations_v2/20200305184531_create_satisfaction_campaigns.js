exports.up = function (knex) {
  return knex.schema.createTable("satisfaction_campaigns", function (table) {
    table.increments();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.string("name").notNullable();
    table.timestamp("started_at").notNullable();
    table.timestamp("ended_at").notNullable();
  });
};

exports.down = function (knex) {
  return knex.raw("DROP TABLE satisfaction_campaigns");
};
