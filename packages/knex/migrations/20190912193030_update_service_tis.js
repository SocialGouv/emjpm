exports.up = async function (knex) {
  await knex.raw(`
  create table temp as select sa.service_id, sti.ti_id from service_tis sti, service_antenne sa where sti.antenne_id = sa.id;
  truncate table service_tis;
  `);
  await knex.schema.alterTable("service_tis", function (table) {
    table.integer("service_id").notNullable();
    table.dropColumn("antenne_id");
    table.dropColumn("created_at");
    table.unique(["ti_id", "service_id"]);
    table.foreign("service_id").references("id").inTable("services");
  });
  return knex.raw(`
insert into service_tis (ti_id, service_id) select distinct ti_id, service_id from temp;
drop table temp;
  `);
};

exports.down = function (knex) {
  return knex.schema.alterTable("service_tis", function (table) {
    table.dropUnique(["ti_id", "service_id"]);
    table.dateTime("created_at");
    table.dropForeign("service_id");
    table.integer("antenne_id").notNullable();
  });
};
