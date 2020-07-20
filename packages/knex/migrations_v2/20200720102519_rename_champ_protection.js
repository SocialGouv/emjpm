exports.up = async function (knex) {
  await knex.raw(`
  ALTER TYPE champ_protection_type RENAME TO champ_mesure_type;
  `);
  return knex.schema.table("mesures", (table) => {
    table.renameColumn("champ_protection", "champ_mesure");
  });
};

exports.down = async function (knex) {
  await knex.raw(`
  ALTER TYPE champ_mesure_type RENAME TO champ_protection_type;
  `);
  return knex.schema.table("mesures", (table) => {
    table.renameColumn("champ_mesure", "champ_protection");
  });
};
