exports.up = function (knex) {
  return knex.schema.createTable("service_member_invitations", function (
    table
  ) {
    table.increments();
    table.string("email").notNullable();
    table.string("token");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("sent_at");
    table.integer("service_id").notNullable();
    table
      .foreign("service_id")
      .references("id")
      .inTable("services")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.raw("DROP TABLE service_member_invitations CASCADE");
};
