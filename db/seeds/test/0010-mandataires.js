exports.seed = function(knex, Promise) {
  return (
    knex("mandataires")
      .del() // Deletes ALL existing entries
      .then(function() {
        // Inserts seed entries one by one in series
        return knex("mandataires").insert({
          etablissement: "UDAHF",
          prenom: "Adrien",
          email: "ud@ud.com",
          code_postal: "62000",
          ville: "Arras",
          telephone: "0237100000",
          telephone_portable: "0101010101",
          adresse: "21 rue de houx",
          mesures_en_cours: 2,
          dispo_max: 3,
          secretariat: false,
          nb_secretariat: 2,
          user_id: 1
        });
      })
      .then(function() {
        // Inserts seed entries one by one in series
        return knex("mandataires").insert({
          etablissement: "test42",
          email: "panam@paris.com",
          prenom: "Julien",
          code_postal: "62000",
          ville: "Paris",
          telephone: "0237100000",
          telephone_portable: "0101010101",
          adresse: "21 rue monge",
          mesures_en_cours: 2,
          dispo_max: 3,
          secretariat: true,
          nb_secretariat: 2,
          user_id: 2
        });
      })
      //disabled mandataire
      .then(function() {
        // Inserts seed entries one by one in series
        return knex("mandataires").insert({
          etablissement: "test43",
          email: "panam2@paris.com",
          prenom: "Doug",
          code_postal: "75000",
          ville: "Paris",
          telephone: "0237100000",
          telephone_portable: "0101010101",
          adresse: "67 rue saint martin",
          mesures_en_cours: 22,
          dispo_max: 38,
          secretariat: false,
          nb_secretariat: 0,
          user_id: 42
        });
      })
      .then(function() {
        // Inserts seed entries one by one in series
        return knex("mandataires").insert({
          etablissement: "test43",
          email: "panam2@paris.com",
          prenom: "Doug",
          code_postal: "10000",
          ville: "Paris",
          telephone: "0237100000",
          telephone_portable: "0101010101",
          adresse: "67 rue saint martin",
          mesures_en_cours: 22,
          dispo_max: 38,
          secretariat: false,
          nb_secretariat: 0,
          user_id: 52
        });
      })
  );
};
