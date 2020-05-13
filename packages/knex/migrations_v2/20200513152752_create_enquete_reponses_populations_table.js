exports.up = async knex => {
  await knex.schema.createTable("enquete_reponses_populations", table => {
    table.increments();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("last_update").defaultTo(knex.fn.now());

    // REPARTITION DES PERSONNES SELON LEUR AGE, LEUR SEXE, ET LA NATURE DE LA MESURE

    table.integer("tutelle_age_inf_25_ans_homme").nullable();
    table.integer("tutelle_age_inf_25_ans_femme").nullable();
    table.integer("tutelle_age_25_39_ans_homme").nullable();
    table.integer("tutelle_age_25_39_ans_femme").nullable();
    table.integer("tutelle_age_40_59_ans_homme").nullable();
    table.integer("tutelle_age_40_59_ans_femme").nullable();
    table.integer("tutelle_age_60_74_ans_homme").nullable();
    table.integer("tutelle_age_60_74_ans_femme").nullable();
    table.integer("tutelle_age_sup_75_ans_homme").nullable();
    table.integer("tutelle_age_sup_75_ans_femme").nullable();

    table.integer("curatelle_age_inf_25_ans_homme").nullable();
    table.integer("curatelle_age_inf_25_ans_femme").nullable();
    table.integer("curatelle_age_25_39_ans_homme").nullable();
    table.integer("curatelle_age_25_39_ans_femme").nullable();
    table.integer("curatelle_age_40_59_ans_homme").nullable();
    table.integer("curatelle_age_40_59_ans_femme").nullable();
    table.integer("curatelle_age_60_74_ans_homme").nullable();
    table.integer("curatelle_age_60_74_ans_femme").nullable();
    table.integer("curatelle_age_sup_75_ans_homme").nullable();
    table.integer("curatelle_age_sup_75_ans_femme").nullable();

    table.integer("maj_age_inf_25_ans_homme").nullable();
    table.integer("maj_age_inf_25_ans_femme").nullable();
    table.integer("maj_age_25_39_ans_homme").nullable();
    table.integer("maj_age_25_39_ans_femme").nullable();
    table.integer("maj_age_40_59_ans_homme").nullable();
    table.integer("maj_age_40_59_ans_femme").nullable();
    table.integer("maj_age_60_74_ans_homme").nullable();
    table.integer("maj_age_60_74_ans_femme").nullable();
    table.integer("maj_age_sup_75_ans_homme").nullable();
    table.integer("maj_age_sup_75_ans_femme").nullable();

    table.integer("sauvegarde_justice_age_inf_25_ans_homme").nullable();
    table.integer("sauvegarde_justice_age_inf_25_ans_femme").nullable();
    table.integer("sauvegarde_justice_age_25_39_ans_homme").nullable();
    table.integer("sauvegarde_justice_age_25_39_ans_femme").nullable();
    table.integer("sauvegarde_justice_age_40_59_ans_homme").nullable();
    table.integer("sauvegarde_justice_age_40_59_ans_femme").nullable();
    table.integer("sauvegarde_justice_age_60_74_ans_homme").nullable();
    table.integer("sauvegarde_justice_age_60_74_ans_femme").nullable();
    table.integer("sauvegarde_justice_age_sup_75_ans_homme").nullable();
    table.integer("sauvegarde_justice_age_sup_75_ans_femme").nullable();

    table.integer("autre_age_inf_25_ans_homme").nullable();
    table.integer("autre_age_inf_25_ans_femme").nullable();
    table.integer("autre_age_25_39_ans_homme").nullable();
    table.integer("autre_age_25_39_ans_femme").nullable();
    table.integer("autre_age_40_59_ans_homme").nullable();
    table.integer("autre_age_40_59_ans_femme").nullable();
    table.integer("autre_age_60_74_ans_homme").nullable();
    table.integer("autre_age_60_74_ans_femme").nullable();
    table.integer("autre_age_sup_75_ans_homme").nullable();
    table.integer("autre_age_sup_75_ans_femme").nullable();

    // REPARTITION DES PERSONNES SELON L'ANCIENNETE DE PRISE EN CHARGE ET LA NATURE DE LA MESURE

    table.integer("tutelle_anciennete_inf_1_an").nullable();
    table.integer("tutelle_anciennete_1_3_ans").nullable();
    table.integer("tutelle_anciennete_3_5_ans").nullable();
    table.integer("tutelle_anciennete_5_10_ans").nullable();
    table.integer("tutelle_anciennete_sup_10_ans").nullable();

    table.integer("curatelle_anciennete_inf_1_an").nullable();
    table.integer("curatelle_anciennete_1_3_ans").nullable();
    table.integer("curatelle_anciennete_3_5_ans").nullable();
    table.integer("curatelle_anciennete_5_10_ans").nullable();
    table.integer("curatelle_anciennete_sup_10_ans").nullable();

    table.integer("maj_anciennete_inf_1_an").nullable();
    table.integer("maj_anciennete_1_3_ans").nullable();
    table.integer("maj_anciennete_3_5_ans").nullable();
    table.integer("maj_anciennete_5_10_ans").nullable();
    table.integer("maj_anciennete_sup_10_ans").nullable();

    table.integer("sauvegarde_justice_anciennete_inf_1_an").nullable();
    table.integer("sauvegarde_justice_anciennete_1_3_ans").nullable();
    table.integer("sauvegarde_justice_anciennete_3_5_ans").nullable();
    table.integer("sauvegarde_justice_anciennete_5_10_ans").nullable();
    table.integer("sauvegarde_justice_anciennete_sup_10_ans").nullable();

    table.integer("autre_anciennete_inf_1_an").nullable();
    table.integer("autre_justice_anciennete_1_3_ans").nullable();
    table.integer("autre_justice_anciennete_3_5_ans").nullable();
    table.integer("autre_justice_anciennete_5_10_ans").nullable();
    table.integer("autre_justice_anciennete_sup_10_ans").nullable();

    // REPARTITION DES PERSONNES EN ETABLISSEMENT SELON LA CATEGORIE D'ETABLISSEMENT DANS LAQUELLE ELLES SONT ACCEUILLIES ET LA NATURE DE LA MESURE

    table.integer("tutelle_etablissement_personne_handicapee").nullable();
    table.integer("tutelle_service_personne_handicapee").nullable();
    table.integer("tutelle_ehpad").nullable();
    table.integer("tutelle_autre_etablissement_personne_agee").nullable();
    table.integer("tutelle_chrs").nullable();
    table.integer("tutelle_service_hospitalier_soins_longue_duree").nullable();
    table.integer("tutelle_service_psychiatrique").nullable();
    table.integer("tutelle_autre_service").nullable();

    table.integer("curatelle_etablissement_personne_handicapee").nullable();
    table.integer("curatelle_service_personne_handicapee").nullable();
    table.integer("curatelle_ehpad").nullable();
    table.integer("curatelle_autre_etablissement_personne_agee").nullable();
    table.integer("curatelle_chrs").nullable();
    table
      .integer("curatelle_service_hospitalier_soins_longue_duree")
      .nullable();
    table.integer("curatelle_service_psychiatrique").nullable();
    table.integer("curatelle_autre_service").nullable();

    table.integer("maj_etablissement_personne_handicapee").nullable();
    table.integer("maj_service_personne_handicapee").nullable();
    table.integer("maj_ehpad").nullable();
    table.integer("maj_autre_etablissement_personne_agee").nullable();
    table.integer("maj_chrs").nullable();
    table.integer("maj_service_hospitalier_soins_longue_duree").nullable();
    table.integer("maj_service_psychiatrique").nullable();
    table.integer("maj_autre_service").nullable();

    table
      .integer("sauvegarde_justice_etablissement_personne_handicapee")
      .nullable();
    table.integer("sauvegarde_justice_service_personne_handicapee").nullable();
    table.integer("sauvegarde_justice_ehpad").nullable();
    table
      .integer("sauvegarde_justice_autre_etablissement_personne_agee")
      .nullable();
    table.integer("sauvegarde_justice_chrs").nullable();
    table
      .integer("sauvegarde_justice_service_hospitalier_soins_longue_duree")
      .nullable();
    table.integer("sauvegarde_justice_service_psychiatrique").nullable();
    table.integer("sauvegarde_justice_autre_service").nullable();
  });
};

exports.down = async knex => {
  await knex.raw("DROP TABLE enquete_reponses_populations");
};
