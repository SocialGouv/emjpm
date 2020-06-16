exports.up = async function (knex) {
  await knex.raw(
    "update mesures m set department_id = (select id from departements where code = substring(m.code_postal, 0, 3))"
  );
  return knex.schema.alterTable("mesures", function (table) {
    table.foreign("department_id").references("id").inTable("departements");
  });
};

exports.down = async function (knex) {
  await knex.raw("update mesures m set department_id = null");
  return knex.schema.alterTable("mesures", function (table) {
    table.dropForeign("department_id");
  });
};
