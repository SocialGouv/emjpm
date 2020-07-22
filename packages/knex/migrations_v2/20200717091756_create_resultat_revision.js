exports.up = async function (knex) {
  await knex.schema.alterTable("mesures", (table) => {
    table.enu(
      "resultat_revision",
      [
        "aggravation",
        "allegement",
        "dessaisissement_autre_mjpm",
        "dessaisissement_famille",
        "mainlevee",
        "reconduction",
      ],
      { useNative: true, enumName: "resultat_revision_type" }
    );
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable("mesures", async (table) => {
    await table.dropColumn("resultat_revision");
    await knex.raw(`drop type resultat_revision_type;`);
  });
};
