exports.seed = function(knex, Promise) {
  return knex("commentaires")
    .del() // Deletes ALL existing entries
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("commentaires").insert({
        co_comment: "Hello, world",
        mandataire_id: 1,
        ti_id: 1
      });
    })
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("commentaires").insert({
        co_comment: "Hello, world 2",
        mandataire_id: 2,
        ti_id: 1
      });
    });
};
