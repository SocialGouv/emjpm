exports.seed = function(knex, Promise) {
  return knex("mesures")
    .del() // Deletes ALL existing entries
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("mesures").insert({
        code_postal: "62000",
        ville: "Arras",
        etablissement: "UDAHF",
        mandataire_id: 1,
        created_at: "2010-10-05",
        annee: "2010-10-05",
        type: "preposes",
        date_ouverture: "2010-10-05",
        residence: "oui",
        civilite: "F",
        status: "Mesure en cours"
      });
    })
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("mesures").insert({
        code_postal: "75000",
        ville: "Paris",
        etablissement: "UDAHF",
        mandataire_id: 2,
        created_at: "2010-10-05",
        annee: "2010-10-05",
        type: "preposes",
        date_ouverture: "2010-10-05",
        residence: "oui",
        civilite: "F",
        status: "Mesure en cours"
      });
    })
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("mesures").insert({
        etablissement: "UDAHF",
        code_postal: "93000",
        mandataire_id: 1,
        created_at: "2010-10-05",
        annee: "2010-10-05",
        type: "preposes",
        date_ouverture: "2010-10-05",
        civilite: "F",
        status: "Mesure en attente"
      });
    })
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("mesures").insert({
        code_postal: "93000",
        ville: "St Denis",
        etablissement: "CAROUF",
        mandataire_id: 1,
        created_at: "2010-10-05",
        annee: "2010-10-05",
        type: "preposes",
        date_ouverture: "2010-10-05",
        residence: "oui",
        civilite: "H",
        status: "Mesure en cours"
      });
    });
};
