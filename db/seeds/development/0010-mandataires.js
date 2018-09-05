exports.seed = function(knex, Promise) {
  return knex("mandataires")
    .del() // Deletes ALL existing entries
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("mandataires").insert({
        etablissement: "test individuel",
        email: "individuel@individuel.com",
        code_postal: "10000",
        nom: "nom individuel",
        prenom: "prenom individuel",
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
        email: "prepose@prepose.com",
        code_postal: "12000",
        nom: "nom prepose",
        prenom: "prenom prepose",
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
        email: "individuel2@individuel.com",
        code_postal: "15000",
        nom: "nom individuel2",
        prenom: "prenom individuel2",
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
        email: "service1@individuel.com",
        code_postal: "75010",
        nom: "nom service 1",
        prenom: "prenom service 1",
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
