exports.seed = function(knex, Promise) {
  return knex("mesures")
    .del() // Deletes ALL existing entries
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("mesures").insert({
        code_postal: "62000",
        ville: "Arras",
        etablissement: "UDAHF",
        latitude: 2.6333,
        longitude: 50.5333,
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
        latitude: 50.5333,
        longitude: 2.6333,
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
        code_postal: "93000",
        ville: "St Denis",
        etablissement: "CAROUF",
        latitude: 50.5333,
        longitude: 2.6333,
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
