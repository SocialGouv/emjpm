exports.seed = function (knex) {
  if (process.env.NODE_ENV != "test") {
    return Promise.resolve();
  }
  return knex("tis")
    .del() // Deletes ALL existing entries
    .then(function () {
      // Inserts seed entries one by one in series
      return knex("tis").insert({
        etablissement: "ti arras",
        email: "ad@ad.com",
        code_postal: "62000",
        ville: "Arras",
        telephone: "0237100000",
        siret: "17590111501251",
      });
    })
    .then(function () {
      return knex("tis").insert({
        etablissement: "ti paris",
        email: "ad@paris.com",
        code_postal: "75000",
        ville: "Paris",
        telephone: "0102030405",
      });
    });
};
