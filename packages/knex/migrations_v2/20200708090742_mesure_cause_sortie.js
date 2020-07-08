exports.up = function (knex) {
  return knex.schema.table("mesures", (table) => {
    table.dropColumn("reason_extinction");
    table.enu(
      "cause_sortie",
      [
        "mainlevee",
        "deces",
        "caducite",
        "dessaisissement_famille",
        "dessaisissement_autre_mjpm",
      ],
      {
        useNative: true,
        enumName: "cause_sortie_type",
      }
    );
  });
};

exports.down = async function (knex) {
  return knex.schema.table("mesures", (table) => {
    table.dropColumn("cause_sortie");
    table.string("reason_extinction");
  });
};
