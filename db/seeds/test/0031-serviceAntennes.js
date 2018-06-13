exports.seed = function(knex, Promise) {
  return knex("serviceAntennes")
    .del() // Deletes ALL existing entries
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("serviceAntennes").insert({
        etablissement: "UDAHF",
        email: "ud@ud.com",
        type: "preposes",
        code_postal: "62000",
        ville: "Arras",
        telephone: "0237100000",
        adresse: "21 rue de houx",
        disponibilite: 2,
        dispo_max: 3,
        service_id: 1
      });
    })
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("serviceAntennes").insert({
        etablissement: "UDAHF",
        email: "ud@ud.com",
        type: "preposes",
        code_postal: "62000",
        ville: "Arras",
        telephone: "0237100000",
        adresse: "21 rue de houx",
        disponibilite: 2,
        dispo_max: 3,
        service_id: 2
      });
    });
};
