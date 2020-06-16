exports.up = async function (knex) {
  await knex.schema.alterTable("mandataires", function (table) {
    table.integer("department_id");
  });
  await knex.raw(
    "update mandataires m set department_id = (select id from departements where code = substring(m.code_postal, 0, 3))"
  );
  await knex.schema.alterTable("mandataires", function (table) {
    table.integer("department_id").notNullable().alter();
  });
  return knex.schema.alterTable("mandataires", function (table) {
    table.foreign("department_id").references("id").inTable("departements");
  });
};

exports.down = async function (knex) {
  return knex.schema.alterTable("mandataires", function (table) {
    table.dropColumn("department_id");
  });
};
