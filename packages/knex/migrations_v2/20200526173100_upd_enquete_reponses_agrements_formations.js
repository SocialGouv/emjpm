exports.up = function(knex) {
  return knex.schema.alterTable(
    "enquete_reponses_agrements_formations",
    function(table) {
      table.integer("nb_mesures_dep_finance").nullable();
      table.integer("nb_mesures_dep_autres").nullable();
      table.integer("cnc_annee_obtention").nullable();
      table.integer("cnc_heures_formation").nullable();
      table.float("secretaire_specialise_etp_n1").nullable();
      table.float("secretaire_specialise_etp_n2").nullable();
      table.float("secretaire_specialise_etp_n3").nullable();
      table.float("secretaire_specialise_etp_n4").nullable();
      table.float("secretaire_specialise_etp_n5").nullable();
      table.float("secretaire_specialise_etp_n6").nullable();
      table.dropColumn("cnc_maj_heure_formation");
      table.dropColumn("cnc_maj_annee_obtention");
      table.dropColumn("cnc_dpf_heure_formation");
      table.dropColumn("cnc_dpf_annee_obtention");
      table.dropColumn("cnc_mjpm_heure_formation");
      table.dropColumn("cnc_mjpm_annee_obtention");
      table.dropColumn("niveau_qualification_secretaire_spe");
      table
        .string("nb_departements")
        .nullable()
        .alter(); // integer => string
      table
        .string("niveau_qualification")
        .nullable()
        .alter(); // integer => string
    }
  );
};

exports.down = function(knex) {
  return knex.schema.alterTable(
    "enquete_reponses_agrements_formations",
    function(table) {
      table.integer("niveau_qualification_secretaire_spe").nullable();
      table.dropColumn("nb_mesures_dep_finance");
      table.dropColumn("nb_mesures_dep_autres");
      table.dropColumn("cnc_annee_obtention");
      table.dropColumn("cnc_heures_formation");
      table.dropColumn("secretaire_specialise_etp_n1");
      table.dropColumn("secretaire_specialise_etp_n2");
      table.dropColumn("secretaire_specialise_etp_n3");
      table.dropColumn("secretaire_specialise_etp_n4");
      table.dropColumn("secretaire_specialise_etp_n5");
      table.dropColumn("secretaire_specialise_etp_n6");
      table.integer("cnc_maj_heure_formation").nullable();
      table.integer("cnc_maj_annee_obtention").nullable();
      table.integer("cnc_dpf_heure_formation").nullable();
      table.integer("cnc_dpf_annee_obtention").nullable();
      table.integer("cnc_mjpm_heure_formation").nullable();
      table.integer("cnc_mjpm_annee_obtention").nullable();

      table
        .integer("nb_departements")
        .nullable()
        .alter(); // string => integer
      table
        .integer("niveau_qualification")
        .nullable()
        .alter(); // string => integer
    }
  );
};
