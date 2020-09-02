exports.up = async function (knex) {
  await knex.schema.alterTable("access_tokens", (table) => {
    table.boolean("expired").defaultTo(false);
    table.dateTime("expired_on");
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable("access_tokens", (table) => {
    table.dropColumn("expired");
    table.dropColumn("expired_on");
  });
};
