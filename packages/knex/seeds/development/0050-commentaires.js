exports.seed = function (knex) {
  return knex("commentaires")
    .del() // Deletes ALL existing entries
    .then(function () {
      // Inserts seed entries one by one in series
      return knex("commentaires").insert({
        comment: "Hello, world",
        mandataire_id: 1,
        ti_id: 1,
      });
    })
    .then(function () {
      return knex("commentaires").insert({
        comment: "Hello, world 2",
        mandataire_id: 1,
        ti_id: 2,
      });
    })
    .then(function () {
      return knex("commentaires").insert({
        comment: "Hello, world 2.1",
        mandataire_id: 1,
        ti_id: 2,
      });
    })
    .then(function () {
      return knex("commentaires").insert({
        comment: "Hello, mandataire_id=2,ti_id=2",
        mandataire_id: 2,
        ti_id: 2,
      });
    })
    .then(function () {
      return knex("commentaires").insert({
        comment: "Hello, world 3",
        mandataire_id: 2,
        ti_id: 1,
      });
    })
    .then(function () {
      return knex("commentaires").insert({
        comment: "Hello, mandataire_id=3,ti_id=1",
        mandataire_id: 3,
        ti_id: 1,
      });
    });
};
