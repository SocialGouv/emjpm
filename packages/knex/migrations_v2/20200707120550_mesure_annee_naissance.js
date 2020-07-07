exports.up = async function (knex) {
  return knex.schema.table("mesures", (table) => {
    table.renameColumn("annee", "annee_naissance");
  });
};

exports.down = function (knex) {
  return knex.schema.table("mesures", (table) => {
    table.renameColumn("annee_naissance", "annee");
  });
};
