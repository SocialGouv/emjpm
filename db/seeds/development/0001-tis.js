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
        latitude: 48.862725,
        longitude: 2.287592,
        admin: false,
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
        latitude: 48.462725,
        longitude: 2.253592,
        admin: false,
        user_id: 4
      });
    })
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("tis").insert({
        etablissement: "ti xxx",
        email: "tixxx@test.beta.data.gouv.org.fr.com",
        code_postal: "62000",
        ville: "Test",
        telephone: "0102030405",
        latitude: 48.862725,
        longitude: 2.753592,
        admin: false,
        user_id: 4
      });
    })
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("tis").insert({
        etablissement: "ti aaa",
        email: "tiaaaa@test.beta.data.gouv.org.fr.com",
        code_postal: "62000",
        ville: "Test",
        telephone: "0102030405",
        latitude: 48.262725,
        longitude: 2.2453592,
        admin: false,
        user_id: 4
      });
    });
};
