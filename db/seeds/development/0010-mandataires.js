exports.seed = function(knex, Promise) {
  return knex("mandataires")
    .del() // Deletes ALL existing entries
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("mandataires").insert({
        etablissement: "test individuel",
        email: "individuel@individuel.com",
        type: "individuel",
        code_postal: "10000",
        nom: "nom individuel",
        prenom: "prenom individuel",
        ville: "ville",
        telephone: "0600000000",
        latitude: 48.862725,
        longitude: 2.287592,
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
        type: "prepose",
        code_postal: "12000",
        nom: "nom prepose",
        prenom: "prenom prepose",
        ville: "ville",
        telephone: "0600000000",
        latitude: 48.262725,
        longitude: 2.187592,
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
        type: "individuel",
        code_postal: "15000",
        nom: "nom individuel2",
        prenom: "prenom individuel2",
        ville: "ville",
        telephone: "0600000000",
        latitude: 45.262725,
        longitude: 1.187592,
        adresse: "adresse",
        mesures_en_cours: 1,
        dispo_max: 25,
        user_id: null,
        secretariat: true,
        nb_secretariat: 0.8
      });
    });
};
