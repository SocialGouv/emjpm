exports.up = async function (knex) {
  await knex.schema.alterTable("access_tokens", (table) => {
    table.string("refresh_token");
    table.dateTime("refresh_token_expires_on");
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable("access_tokens", (table) => {
    table.dropColumn("refresh_token");
    table.dropColumn("refresh_token_expires_on");
  });
};
