exports.up = function (knex) {
  return knex.schema.createTable("mesure_etat", (table) => {
    table.increments();
    table
      .integer("mesure_id")
      .references("id")
      .inTable("mesures")
      .notNullable();
    table.date("date_changement_etat").notNullable();
    table.unique(["mesure_id", "date_changement_etat"]);
    table
      .enu(
        "nature_mesure",
        [
          "curatelle_simple",
          "curatelle_renforcee",
          "tutelle",
          "sauvegarde_justice",
          "mesure_accompagnement_judiciaire",
          "subroge_curateur",
          "subroge_tuteur",
          "mandat_protection_future",
          "mesure_ad_hoc",
        ],
        {
          useNative: true,
          enumName: "nature_mesure_type",
        }
      )
      .notNullable();
    table.enu(
      "champ_protection",
      ["protection_bien", "protection_personne", "protection_bien_personne"],
      {
        useNative: true,
        enumName: "champ_protection_type",
      }
    );
    table
      .enu(
        "lieu_vie",
        [
          "domicile",
          "etablissement",
          "etablissement_conservation_domicile",
          "sdf",
        ],
        { useNative: true, existingType: true, enumName: "lieu_vie_type" }
      )
      .notNullable();
    table.string("code_postal").notNullable();
    table.string("ville").notNullable();
    table.string("pays").notNullable();

    table.enu(
      "type_etablissement",
      [
        "etablissement_handicapes",
        "autre_etablissement_s_ms",
        "etablissement_hospitalier",
        "etablissement_psychiatrique",
      ],
      {
        useNative: true,
        existingType: true,
        enumName: "type_etablissement_type",
      }
    );
    table.string("etablissement_siret");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable("mesure_etat");
  return knex.raw(`
drop type nature_mesure_type;
drop type champ_protection_type;
  `);
};
