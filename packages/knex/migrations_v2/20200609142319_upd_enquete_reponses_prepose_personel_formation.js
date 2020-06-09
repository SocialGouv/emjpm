exports.up = function(knex) {
  return knex.schema.alterTable(
    "enquete_reponses_prepose_personel_formation",
    function(table) {
      table.renameColumn("autres_informations", "niveaux_qualification");
    }
  );
};

exports.down = function(knex) {
  return knex.schema.alterTable(
    "enquete_reponses_prepose_personel_formation",
    function(table) {
      table.renameColumn("niveaux_qualification", "autres_informations");
    }
  );
};
