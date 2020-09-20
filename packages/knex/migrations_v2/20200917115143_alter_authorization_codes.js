exports.up = async function (knex) {
  return knex.schema.alterTable("authorization_codes", (table) => {
    table.dateTime("expires_at");
  });
};

exports.down = async function (knex) {
  return knex.schema.alterTable("authorization_codes", (table) => {
    table.dropColumn("expires_at");
  });
};
