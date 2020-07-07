exports.up = async function (knex) {
  await knex.schema.table("mesures", (table) => {
    table.enu(
      "lieu_vie",
      [
        "domicile",
        "etablissement",
        "etablissement_conservation_domicile",
        "sdf",
      ],
      { useNative: true, enumName: "lieu_vie_type" }
    );
    table.enu(
      "type_etablissement",
      [
        "etablissement_handicapes",
        "autre_etablissement_s_ms",
        "etablissement_hospitalier",
        "etablissement_psychiatrique",
      ],
      { useNative: true, enumName: "type_etablissement_type" }
    );
  });
  await knex.raw(`
  update mesures set lieu_vie = 'domicile' where residence = 'domicile';
  update mesures set lieu_vie = 'sdf' where residence = 'sdf';
  update mesures set lieu_vie = 'etablissement_conservation_domicile' where residence = 'en établissement avec conservation du domicile';
  update mesures set lieu_vie = 'etablissement' where residence = 'en établissement';
  `);
  return knex.schema.table("mesures", (table) => {
    table.dropColumn("residence");
  });
};

exports.down = function (knex) {
  return knex.raw(`
alter table mesures drop column lieu_vie;
drop type lieu_vie_type;

alter table mesures drop column type_etablissement;
drop type type_etablissement_type;

alter table mesures add residence varchar(255);
  `);
};
