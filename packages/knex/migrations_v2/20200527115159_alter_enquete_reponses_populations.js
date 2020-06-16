exports.up = async function (knex) {
  await knex.schema.alterTable("enquete_reponses_populations", (table) => {
    table.renameColumn(
      "autre_age_inf_25_ans_homme",
      "autre_mesures_age_inf_25_ans_homme"
    );

    table.renameColumn(
      "autre_age_inf_25_ans_femme",
      "autre_mesures_age_inf_25_ans_femme"
    );

    table.renameColumn(
      "autre_age_25_39_ans_homme",
      "autre_mesures_age_25_39_ans_homme"
    );

    table.renameColumn(
      "autre_age_25_39_ans_femme",
      "autre_mesures_age_25_39_ans_femme"
    );

    table.renameColumn(
      "autre_age_40_59_ans_homme",
      "autre_mesures_age_40_59_ans_homme"
    );

    table.renameColumn(
      "autre_age_40_59_ans_femme",
      "autre_mesures_age_40_59_ans_femme"
    );

    table.renameColumn(
      "autre_age_60_74_ans_homme",
      "autre_mesures_age_60_74_ans_homme"
    );

    table.renameColumn(
      "autre_age_60_74_ans_femme",
      "autre_mesures_age_60_74_ans_femme"
    );

    table.renameColumn(
      "autre_age_sup_75_ans_homme",
      "autre_mesures_age_sup_75_ans_homme"
    );

    table.renameColumn(
      "autre_age_sup_75_ans_femme",
      "autre_mesures_age_sup_75_ans_femme"
    );

    table.renameColumn(
      "autre_anciennete_inf_1_an",
      "autre_mesures_anciennete_inf_1_an"
    );

    table.renameColumn(
      "autre_justice_anciennete_1_3_ans",
      "autre_mesures_anciennete_1_3_ans"
    );

    table.renameColumn(
      "autre_justice_anciennete_3_5_ans",
      "autre_mesures_anciennete_3_5_ans"
    );

    table.renameColumn(
      "autre_justice_anciennete_5_10_ans",
      "autre_mesures_anciennete_5_10_ans"
    );

    table.renameColumn(
      "autre_justice_anciennete_sup_10_ans",
      "autre_mesures_anciennete_sup_10_ans"
    );
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable("enquete_reponses_populations", (table) => {
    table.renameColumn(
      "autre_mesures_age_inf_25_ans_homme",
      "autre_age_inf_25_ans_homme"
    );

    table.renameColumn(
      "autre_mesures_age_inf_25_ans_femme",
      "autre_age_inf_25_ans_femme"
    );

    table.renameColumn(
      "autre_mesures_age_25_39_ans_homme",
      "autre_age_25_39_ans_homme"
    );

    table.renameColumn(
      "autre_mesures_age_25_39_ans_femme",
      "autre_age_25_39_ans_femme"
    );

    table.renameColumn(
      "autre_mesures_age_40_59_ans_homme",
      "autre_age_40_59_ans_homme"
    );

    table.renameColumn(
      "autre_mesures_age_40_59_ans_femme",
      "autre_age_40_59_ans_femme"
    );

    table.renameColumn(
      "autre_mesures_age_60_74_ans_homme",
      "autre_age_60_74_ans_homme"
    );

    table.renameColumn(
      "autre_mesures_age_60_74_ans_femme",
      "autre_age_60_74_ans_femme"
    );

    table.renameColumn(
      "autre_mesures_age_sup_75_ans_homme",
      "autre_age_sup_75_ans_homme"
    );

    table.renameColumn(
      "autre_mesures_age_sup_75_ans_femme",
      "autre_age_sup_75_ans_femme"
    );

    table.renameColumn(
      "autre_mesures_anciennete_inf_1_an",
      "autre_anciennete_inf_1_an"
    );

    table.renameColumn(
      "autre_mesures_anciennete_1_3_ans",
      "autre_justice_anciennete_1_3_ans"
    );

    table.renameColumn(
      "autre_mesures_anciennete_3_5_ans",
      "autre_justice_anciennete_3_5_ans"
    );

    table.renameColumn(
      "autre_mesures_anciennete_5_10_ans",
      "autre_justice_anciennete_5_10_ans"
    );

    table.renameColumn(
      "autre_mesures_anciennete_sup_10_ans",
      "autre_justice_anciennete_sup_10_ans"
    );
  });
};
