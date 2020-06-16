exports.up = async function (knex) {
  await knex.schema.alterTable("mesures", function (table) {
    table.boolean("is_urgent").defaultTo(false);
    table.date("judgment_date");
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable("mesures", function (table) {
    table.dropColumn("is_urgent");
    table.dropColumn("judgment_date");
  });
};
