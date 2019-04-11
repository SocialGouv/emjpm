exports.seed = function(knex, Promise) {
  return knex("mesures")
    .del() // Deletes ALL existing entries
    .then(function() {
      return knex("mesures").insert({
        code_postal: "62000",
        ville: "Arras",
        etablissement: "UDAHF",
        mandataire_id: 1,
        created_at: "2010-10-07",
        annee: "2010-10-07",
        type: "Curatelle",
        date_ouverture: "2010-10-07",
        residence: "A Domicile",
        civilite: "madame",
        status: "Mesure en cours"
      });
    })
    .then(function() {
      return knex("mesures").insert({
        code_postal: "75010",
        ville: "Paris",
        etablissement: "UDAHF",
        mandataire_id: 1,
        created_at: "2010-10-05",
        annee: "2010-10-05",
        type: "Tutelle",
        date_ouverture: "2010-10-05",
        residence: "En etablissement",
        civilite: "F",
        status: "Mesure en cours"
      });
    })
    .then(function() {
      return knex("mesures").insert({
        code_postal: "95200",
        ville: "Paris",
        etablissement: "UDAHF",
        mandataire_id: 1,
        created_at: "2010-10-05",
        annee: "2010-10-05",
        type: "Tutelle",
        date_ouverture: "2010-10-05",
        residence: "En etablissement",
        civilite: "madame",
        status: "Eteindre mesure"
      });
    })
    .then(function() {
      return knex("mesures").insert({
        code_postal: "92300",
        ville: "Paris",
        etablissement: "UDAHF",
        mandataire_id: 2,
        created_at: "2010-10-05",
        annee: "2010-10-05",
        type: "Tutelle",
        date_ouverture: "2010-10-05",
        residence: "En etablissement",
        civilite: "madame",
        status: "Mesure en cours"
      });
    })
    .then(function() {
      return knex("mesures").insert({
        code_postal: "62100",
        ville: "Arras",
        etablissement: "UDAHF",
        mandataire_id: 2,
        created_at: "2010-10-07",
        annee: "2010-10-07",
        type: "Curatelle",
        date_ouverture: "2010-10-07",
        residence: "oui",
        civilite: "madame",
        status: "Mesure en cours"
      });
    })
    .then(function() {
      return knex("mesures").insert({
        code_postal: "62500",
        ville: "Paris",
        etablissement: "UDAHF",
        mandataire_id: 3,
        created_at: "2010-10-05",
        annee: "2010-10-05",
        type: "Tutelle",
        date_ouverture: "2010-10-05",
        residence: "oui",
        civilite: "madame",
        status: "Eteindre mesure"
      });
    })
    .then(function() {
      return knex("mesures").insert({
        code_postal: "89100",
        ville: "Paris",
        etablissement: "UDAHF",
        mandataire_id: 2,
        created_at: "2010-10-05",
        annee: "2010-10-05",
        type: "Tutelle",
        date_ouverture: "2010-10-05",
        residence: "oui",
        civilite: "madame",
        status: "Mesure en cours"
      });
    })
    .then(function() {
      return knex("mesures").insert({
        code_postal: "89100",
        ville: "Some Town",
        etablissement: "UDAHF",
        mandataire_id: 1,
        created_at: "2010-10-05",
        annee: "2010-10-05",
        type: "Tutelle",
        date_ouverture: "2010-10-05",
        residence: "oui",
        civilite: "madame",
        status: "Mesure en cours"
      });
    })
    .then(function() {
      return knex("mesures").insert({
        code_postal: "89500",
        ville: "Some Town",
        etablissement: "UDAHF",
        mandataire_id: 4,
        created_at: "2010-10-05",
        annee: "2010-10-05",
        type: "Tutelle",
        date_ouverture: "2010-10-05",
        residence: "oui",
        civilite: "madame",
        status: "Mesure en cours"
      });
    });
};
