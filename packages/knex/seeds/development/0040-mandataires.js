exports.seed = function (knex) {
  return (
    knex("mandataires")
      .del() // Deletes ALL existing entries
      .then(function () {
        // Inserts seed entries one by one in series
        return knex("mandataires").insert({
          etablissement: "UDAHF",
          code_postal: "62000",
          department_id: 6,
          ville: "Arras",
          telephone: "0237100000",
          telephone_portable: "0101010101",
          adresse: "21 rue de houx",
          mesures_en_cours: 1,
          dispo_max: 5,
          user_id: 1,
          latitude: 48.840356,
          longitude: 2.27154,
        });
      })
      .then(function () {
        // Inserts seed entries one by one in series
        return knex("mandataires").insert({
          etablissement: "test42",
          code_postal: "62000",
          department_id: 6,
          ville: "Paris",
          telephone: "0237100000",
          telephone_portable: "0101010101",
          adresse: "21 rue monge",
          mesures_en_cours: 2,
          dispo_max: 3,
          user_id: 2,
          latitude: 48.8359,
          longitude: 2.27154,
        });
      })
      //disabled mandataire
      .then(function () {
        // Inserts seed entries one by one in series
        return knex("mandataires").insert({
          etablissement: "test43",
          code_postal: "75000",
          department_id: 7,
          ville: "Paris",
          telephone: "0237100000",
          telephone_portable: "0101010101",
          adresse: "67 rue saint martin",
          mesures_en_cours: 22,
          dispo_max: 38,
          user_id: 42,
          latitude: 48.840359,
          longitude: 2.27154,
        });
      })
      .then(function () {
        // Inserts seed entries one by one in series
        return knex("mandataires").insert({
          etablissement: "test43",
          code_postal: "10000",
          department_id: 10,
          ville: "Paris",
          telephone: "0237100000",
          telephone_portable: "0101010101",
          adresse: "67 rue saint martin",
          mesures_en_cours: 22,
          dispo_max: 38,
          user_id: 52,
          latitude: 48.858483,
          longitude: 2.27154,
        });
      })

      .then(function () {
        // Inserts seed entries one by one in series
        return knex("mandataires").insert({
          etablissement: "service-1",
          code_postal: "13000",
          department_id: 13,
          ville: "Marseille",
          telephone: "0237100000",
          telephone_portable: "0101010101",
          adresse: "67 rue saint louis",
          mesures_en_cours: 12,
          dispo_max: 55,
          user_id: 3,
          latitude: 48.85843,
          longitude: 2.27154,
        });
      })
  );
};
