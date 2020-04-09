exports.up = async function(knex) {
  await knex.schema.createTable("enquiries", table => {
    table.increments();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .string("year")
      .unique()
      .notNullable();
    table.string("status").notNullable();
  });

  await knex.schema.createTable("enquiry_answers", table => {
    table.increments();
    table
      .enu("type", ["individuel", "prepose", "content"], {
        useNative: true,
        enumName: "enquiry_answer_types"
      })
      .notNullable();
    table
      .integer("enquiry_id")
      .references("id")
      .inTable("enquiries");
    table.jsonb("content");
  });
};

exports.down = async function(knex) {
  await knex.raw("DROP TABLE enquiry_answers");
  await knex.raw("DROP TABLE enquiries");
  await knex.raw("DROP TYPE IF EXISTS enquiry_answer_types CASCADE");
};
