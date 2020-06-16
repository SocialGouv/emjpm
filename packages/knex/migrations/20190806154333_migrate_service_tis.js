exports.up = async function (knex) {
  await knex.raw(
    `update service_tis stis set antenne_id = (select id from service_antenne where bak_mandataire_id = stis.mandataire_id)`
  );

  return knex.schema.alterTable("service_tis", function (table) {
    table.dropColumn("mandataire_id");
    table.integer("antenne_id").notNullable().alter();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("service_tis", function (table) {
    table.integer("mandataire_id");
    table.foreign("mandataire_id").references("id").inTable("mandataires");
  });
};
