exports.seed = function(knex, Promise) {
  return knex("mandataires")
    .del() // Deletes ALL existing entries
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("mandataires").insert({
        etablissement: "test individuel",
        code_postal: "10000",
        ville: "ville",
        telephone: "0600000000",
        adresse: "adresse",
        mesures_en_cours: 2,
        dispo_max: 5,
        user_id: 1,
        secretariat: true,
        nb_secretariat: 0.8
      });
    })
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("mandataires").insert({
        etablissement: "test prepose",
        code_postal: "12000",
        ville: "ville",
        telephone: "0600000000",
        adresse: "adresse",
        mesures_en_cours: 2,
        dispo_max: 10,
        user_id: 2,
        secretariat: false,
        nb_secretariat: 0
      });
    })
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("mandataires").insert({
        etablissement: "test individuel2",
        code_postal: "15000",
        ville: "ville",
        telephone: "0600000000",
        adresse: "adresse",
        mesures_en_cours: 1,
        dispo_max: 25,
        user_id: null,
        secretariat: true,
        nb_secretariat: 0.8
      });
    })
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("mandataires").insert({
        etablissement: "test service 1",
        code_postal: "75010",
        ville: "ville",
        telephone: "0403003933",
        adresse: "adresse",
        mesures_en_cours: 0,
        dispo_max: 100,
        user_id: 3,
        secretariat: true,
        nb_secretariat: 0.8
      });
    });
};
