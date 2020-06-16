exports.up = async function (knex) {
  await knex.schema.alterTable("commentaires", function (table) {
    table.integer("service_id");
    table.foreign("service_id").references("id").inTable("services");
  });
  return knex.raw(`
update commentaires set service_id = (select sa.service_id from service_antenne sa where sa.id = antenne_id ) where antenne_id is not null;
  `);
};

exports.down = function (knex) {
  return knex.schema.alterTable("commentaires", function (table) {
    table.dropForeign("service_id");
    table.dropColumn("service_id");
  });
};
