exports.up = async function(knex) {
  await knex.schema.alterTable("enquete_reponses_populations", table => {
    table.integer("autre_mesures_etablissement_personne_handicapee").nullable();
    table.integer("autre_mesures_service_personne_handicapee").nullable();
    table.integer("autre_mesures_ehpad").nullable();
    table.integer("autre_mesures_autre_etablissement_personne_agee").nullable();
    table.integer("autre_mesures_chrs").nullable();
    table
      .integer("autre_mesures_service_hospitalier_soins_longue_duree")
      .nullable();
    table.integer("autre_mesures_service_psychiatrique").nullable();
    table.integer("autre_mesures_autre_service").nullable();
  });
};

exports.down = async function(knex) {
  await knex.schema.alterTable("enquete_reponses_populations", table => {
    table.dropColumn("autre_mesures_etablissement_personne_handicapee");
    table.dropColumn("autre_mesures_service_personne_handicapee");
    table.dropColumn("autre_mesures_ehpad");
    table.dropColumn("autre_mesures_autre_etablissement_personne_agee");
    table.dropColumn("autre_mesures_chrs");
    table.dropColumn("autre_mesures_service_hospitalier_soins_longue_duree");
    table.dropColumn("autre_mesures_service_psychiatrique");
    table.dropColumn("autre_mesures_autre_service");
  });
};
