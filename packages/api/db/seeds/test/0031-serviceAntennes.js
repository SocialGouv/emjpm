exports.seed = function(knex, Promise) {
  return knex("service_antennes")
    .del() // Deletes ALL existing entries
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("service_antennes").insert({
        etablissement: "UDAHF",
        email: "ud@ud.com",
        type: "preposes",
        code_postal: "62000",
        ville: "Arras",
        telephone: "0237100000",
        adresse: "21 rue de houx",
        mesures_en_cours: 2,
        dispo_max: 3,
        mandataire_id: 1
      });
    })
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("service_antennes").insert({
        etablissement: "UDAHF",
        email: "ud@ud.com",
        type: "preposes",
        code_postal: "62000",
        ville: "Arras",
        telephone: "0237100000",
        adresse: "21 rue de houx",
        mesures_en_cours: 2,
        dispo_max: 3,
        mandataire_id: 2
      });
    });
};
