exports.up = async function (knex) {
  await knex.schema.alterTable("mesures", (table) => {
    table.date("date_premier_mesure").nullable();
    table.date("date_protection_en_cours").nullable();
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable("mesures", (table) => {
    table.dropColumn("date_premier_mesure");
    table.dropColumn("date_protection_en_cours");
  });
};
