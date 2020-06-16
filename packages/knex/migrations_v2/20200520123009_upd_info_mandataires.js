exports.up = function (knex) {
  return knex.schema.alterTable(
    "enquete_reponses_informations_mandataire",
    function (table) {
      table.string("departement").nullable();
      table.string("region").nullable();
      table.string("nom").nullable();
      table.boolean("exerce_seul_activite").nullable();
      table.boolean("exerce_secretaires_specialises").nullable();
      table.string("tranche_age").nullable();
      table.float("secretaire_specialise_etp").nullable().alter(); // string=>number
    }
  );
};

exports.down = function (knex) {
  return knex.schema.alterTable(
    "enquete_reponses_informations_mandataire",
    function (table) {
      table.dropColumn("departement");
      table.dropColumn("region");
      table.dropColumn("nom");
      table.dropColumn("tranche_age");
      table.dropColumn("exerce_seul_activite");
      table.dropColumn("exerce_secretaires_specialises");
      table.string("secretaire_specialise_etp").nullable().alter(); // number=>string
    }
  );
};
