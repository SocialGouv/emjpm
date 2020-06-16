exports.up = function (knex) {
  return knex.schema.createTable("satisfaction_campaign_answers", function (
    table
  ) {
    table.increments();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .integer("satisfaction_campaign_id")
      .references("id")
      .inTable("satisfaction_campaigns")
      .notNullable();
    table.integer("user_id").references("id").inTable("users").notNullable();
    table.integer("value").notNullable();
  });
};

exports.down = function (knex) {
  return knex.raw("DROP TABLE satisfaction_campaign_answers");
};
