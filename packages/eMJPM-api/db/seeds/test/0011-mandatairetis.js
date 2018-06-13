exports.seed = function(knex, Promise) {
  return knex("mandatairetis")
    .del() // Deletes ALL existing entries
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("mandatairetis").insert({
        ti_id: 1,
        mandataire_id: 1
      });
    })
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("mandatairetis").insert({
        ti_id: 1,
        mandataire_id: 2
      });
    })
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("mandatairetis").insert({
        ti_id: 2,
        mandataire_id: 2
      });
    })
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("mandatairetis").insert({
        ti_id: 2,
        mandataire_id: 1
      });
    });
};
