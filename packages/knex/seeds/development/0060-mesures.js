exports.seed = function (knex) {
  return knex("mesures")
    .del() // Deletes ALL existing entries
    .then(function () {
      // Inserts seed entries one by one in series
      return knex("mesures").insert({
        code_postal: "62000",
        ville: "Arras",
        etablissement: "UDAHF",
        mandataire_id: 1,
        created_at: "2010-10-05",
        annee_naissance: "2010-10-05",
        type: "curatelle renforcée à la personne",
        date_nomination: "2010-10-05",
        lieu_vie: "etablissement",
        civilite: "F",
        status: "Eteindre mesure",
        extinction: "2019-07-01T00:00:00Z",
        latitude: 48.858483,
        longitude: 2.27154,
      });
    })
    .then(function () {
      // Inserts seed entries one by one in series
      return knex("mesures").insert({
        code_postal: "75000",
        ville: "Paris",
        etablissement: "UDAHF",
        mandataire_id: 2,
        created_at: "2010-10-05",
        annee_naissance: "2010-10-05",
        type: "mandat de protection future",
        date_nomination: "2010-10-05",
        lieu_vie: "etablissement",
        civilite: "F",
        status: "Mesure en cours",
        latitude: 48.858483,
        longitude: 2.27154,
      });
    })
    .then(function () {
      // Inserts seed entries one by one in series
      return knex("mesures").insert({
        etablissement: "UDAHF",
        code_postal: "93000",
        mandataire_id: 1,
        created_at: "2010-10-05",
        annee_naissance: "2010-10-05",
        type: "tutelle",
        date_nomination: "2010-10-05",
        lieu_vie: "domicile",
        civilite: "F",
        status: "Mesure en attente",
        latitude: 48.858483,
        longitude: 2.27154,
      });
    })
    .then(function () {
      // Inserts seed entries one by one in series
      return knex("mesures").insert({
        code_postal: "93000",
        ville: "St Denis",
        etablissement: "CAROUF",
        mandataire_id: 1,
        created_at: "2010-10-05",
        annee_naissance: "2010-10-05",
        type: "sauvegarde de justice",
        date_nomination: "2010-10-05",
        lieu_vie: "etablissement",
        civilite: "H",
        status: "Mesure en cours",
        latitude: 48.858483,
        longitude: 2.27154,
      });
    })
    .then(function () {
      // Inserts seed entries one by one in series
      return knex("mesures").insert({
        code_postal: "92000",
        ville: "St ambroise",
        etablissement: "CRF1",
        mandataire_id: 1,
        created_at: "2012-10-05",
        annee_naissance: "2012-10-05",
        type: "tutelle aux biens",
        date_nomination: "2012-10-05",
        lieu_vie: "etablissement",
        civilite: "F",
        status: "Eteindre mesure",
        latitude: 48.858483,
        longitude: 2.27154,
      });
    });
};
