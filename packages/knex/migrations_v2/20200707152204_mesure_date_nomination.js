exports.up = async function (knex) {
  return knex.schema.table("mesures", (table) => {
    table.renameColumn("date_ouverture", "date_nomination");
  });
};

exports.down = function (knex) {
  return knex.schema.table("mesures", (table) => {
    table.renameColumn("date_nomination", "date_ouverture");
  });
};
