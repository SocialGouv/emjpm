exports.up = async function (knex) {
  await knex.schema.table("mesures", (table) => {
    table.renameColumn("status", "status_bak");
  });
  await knex.schema.table("mesures", (table) => {
    table.enu("status", ["en_attente", "en_cours", "eteinte"], {
      useNative: true,
      existingType: false,
      enumName: "mesure_status_type",
    });
  });
  return knex.raw(`
  update mesures set status = 'en_attente' where status_bak = 'Mesure en attente';
  update mesures set status = 'en_cours' where status_bak = 'Mesure en cours';
  update mesures set status = 'eteinte' where status_bak = 'Eteindre mesure';

  alter table mesures drop status_bak;
  `)
};

exports.down = async function (knex) {
  await knex.raw(`
  alter table mesures drop column status;
  `);
  return knex.raw(`
  alter table mesures add status varchar;
  `)
};
