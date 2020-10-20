exports.seed = function (knex) {
  return knex("mesures")
    .del() // Deletes ALL existing entries
    .then(function () {
      // Inserts seed entries one by one in series
      return knex("mesures").insert({
        code_postal: "62000",
        ville: "Arras",
        mandataire_id: 1,
        created_at: "2010-10-05",
        annee_naissance: "2010-10-05",
        nature_mesure: "curatelle_renforcee",
        champ_mesure: "protection_personne",
        date_nomination: "2010-10-05",
        lieu_vie: "etablissement",
        civilite: "madame",
        status: "eteinte",
        date_fin_mesure: "2019-07-01T00:00:00Z",
        latitude: 48.858483,
        longitude: 2.27154,
      });
    })
    .then(function () {
      // Inserts seed entries one by one in series
      return knex("mesures").insert({
        code_postal: "75000",
        ville: "Paris",
        mandataire_id: 2,
        created_at: "2010-10-05",
        annee_naissance: "2010-10-05",
        nature_mesure: "mandat_protection_future",
        date_nomination: "2010-10-05",
        lieu_vie: "etablissement",
        civilite: "madame",
        status: "en_cours",
        latitude: 48.858483,
        longitude: 2.27154,
      });
    })
    .then(function () {
      // Inserts seed entries one by one in series
      return knex("mesures").insert({
        code_postal: "93000",
        mandataire_id: 1,
        created_at: "2010-10-05",
        annee_naissance: "2010-10-05",
        nature_mesure: "tutelle",
        date_nomination: "2010-10-05",
        lieu_vie: "domicile",
        civilite: "madame",
        status: "en_attente",
        latitude: 48.858483,
        longitude: 2.27154,
      });
    })
    .then(function () {
      // Inserts seed entries one by one in series
      return knex("mesures").insert({
        code_postal: "93000",
        ville: "St Denis",
        mandataire_id: 1,
        created_at: "2010-10-05",
        annee_naissance: "2010-10-05",
        nature_mesure: "sauvegarde_justice",
        date_nomination: "2010-10-05",
        lieu_vie: "etablissement",
        civilite: "monsieur",
        status: "en_cours",
        latitude: 48.858483,
        longitude: 2.27154,
      });
    })
    .then(function () {
      // Inserts seed entries one by one in series
      return knex("mesures").insert({
        code_postal: "92000",
        ville: "St ambroise",
        mandataire_id: 1,
        created_at: "2012-10-05",
        annee_naissance: "2012-10-05",
        nature_mesure: "tutelle",
        champ_mesure: "protection_bien",
        date_nomination: "2012-10-05",
        lieu_vie: "etablissement",
        civilite: "madame",
        status: "eteinte",
        latitude: 48.858483,
        longitude: 2.27154,
      });
    });
};
