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
    });
};
