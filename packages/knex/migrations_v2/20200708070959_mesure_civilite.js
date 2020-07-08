exports.up = async function (knex) {
  await knex.schema.table("mesures", (table) => {
    table.renameColumn("civilite", "civilite_bak");
  });
  await knex.schema.table("mesures", (table) => {
    table.enu("civilite", ["monsieur", "madame"], {
      useNative: true,
      enumName: "civilite_type",
    });
  });
  return knex.raw(`
update mesures set civilite = 'monsieur' where civilite_bak in ('H', 'M');
update mesures set civilite = 'madame' where civilite_bak in ('F', 'f');
alter table mesures drop civilite_bak;
    `);
};

exports.down = async function (knex) {
  await knex.schema.table("mesures", (table) => {
    table.dropColumn("civilite");
  });
  return knex.schema.table("mesures", (table) => {
    table.string("civilite");
  });
};
