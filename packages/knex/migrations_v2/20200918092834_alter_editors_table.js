exports.up = async function (knex) {
  return knex.schema.alterTable("editors", (table) => {
    table.jsonb("redirect_uris").default([]);
  });
};

exports.down = async function (knex) {
  return knex.schema.alterTable("editors", (table) => {
    table.dropColumn("redirect_uris");
  });
};
