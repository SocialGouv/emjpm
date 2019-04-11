exports.seed = function(knex, Promise) {
  return knex("tis")
    .del() // Deletes ALL existing entries
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("tis").insert({
        etablissement: "ti test",
        email: "ti@test.beta.data.gouv.org.fr.com",
        code_postal: "64000",
        ville: "Test",
        telephone: "0102030405",
        latitude: 45.862725,
        longitude: 2.187592,
        user_id: 1
      });
    })
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("tis").insert({
        etablissement: "ti test 2",
        email: "ti2@test.beta.data.gouv.org.fr.com",
        code_postal: "62000",
        ville: "Test",
        telephone: "0102030405",
        latitude: 46.462725,
        longitude: 2.253592,
        user_id: 2
      });
    })
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("tis").insert({
        etablissement: "ti test 3",
        email: "tixxx@test.beta.data.gouv.org.fr.com",
        code_postal: "56200",
        ville: "Test",
        telephone: "0102030405",
        latitude: 43.862725,
        longitude: 2.153592,
        user_id: 3
      });
    })
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("tis").insert({
        etablissement: "ti test 4",
        email: "tiaaaa@test.beta.data.gouv.org.fr.com",
        code_postal: "95200",
        ville: "Test",
        telephone: "0102030405",
        latitude: 47.262725,
        longitude: 2.4453592,
        user_id: 4
      });
    });
};
