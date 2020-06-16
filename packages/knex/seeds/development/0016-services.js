exports.seed = function (knex) {
  return knex("services")
    .del() // Deletes ALL existing entries
    .then(function () {
      // Inserts seed entries one by one in series
      return knex("services").insert({
        etablissement: "UDAHF Siege",
        code_postal: "62000",
        department_id: 6,
        ville: "Arras",
        telephone: "0237100000",
        adresse: "21 rue de houx",
        dispo_max: 3,
      });
    });
};
