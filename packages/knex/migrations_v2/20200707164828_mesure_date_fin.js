exports.up = async function (knex) {
  return knex.schema.table("mesures", (table) => {
    table.renameColumn("extinction", "date_fin_mesure");
  });
};

exports.down = function (knex) {
  return knex.schema.table("mesures", (table) => {
    table.renameColumn("date_fin_mesure", "extinction");
  });
};
