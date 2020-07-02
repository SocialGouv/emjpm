exports.up = async function (knex) {
  await knex.schema.alterTable("direction", (table) => {
    table.foreign("user_id").references("id").inTable("users");
    table.string("type").nullable();
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable("direction", (table) => {
    table.dropForeign("user_id");
    table.dropColumn("type");
  });
};
