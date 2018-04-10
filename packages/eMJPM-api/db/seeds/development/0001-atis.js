exports.seed = function(knex, Promise) {
  return knex("tis")
    .del() // Deletes ALL existing entries
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("tis").insert({
        etablissement: "ti arras",
        email: "ad@ad.com",
        code_postal: "62000",
        ville: "Arras",
        telephone: "0237100000",
        latitude: 1,
        longitude: 1,
        admin: false,
        user_id: 1
      });
    })
    .then(function() {
      return knex("tis").insert({
        etablissement: "ti paris",
        email: "ad@paris.com",
        code_postal: "75000",
        ville: "Paris",
        telephone: "0102030405",
        latitude: 1,
        longitude: 1,
        admin: false,
        user_id: 2
      });
    });
};
