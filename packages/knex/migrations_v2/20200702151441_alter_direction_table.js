exports.up = async function (knex) {
  await knex.schema.alterTable("direction", (table) => {
    table.foreign("user_id").references("id").inTable("users");
    table.foreign("department_id").references("id").inTable("departements");
    table.foreign("region_id").references("id").inTable("regions");
    table.string("type").nullable();
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable("direction", (table) => {
    table.dropForeign("user_id");
    table.dropForeign("department_id");
    table.dropForeign("region_id");
    table.dropColumn("type");
  });
};
