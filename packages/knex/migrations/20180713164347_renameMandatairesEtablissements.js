exports.up = function (knex) {
  return knex.schema.renameTable(
    "mandatairesEtablissements",
    "mandataire_etablissements"
  );
};

exports.down = function (knex) {
  return knex.schema.renameTable(
    "mandataire_etablissements",
    "mandatairesEtablissements"
  );
};
