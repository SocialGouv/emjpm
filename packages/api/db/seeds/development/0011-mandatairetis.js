exports.seed = function(knex) {
  return knex("mandataire_tis")
    .del() // Deletes ALL existing entries
    .then(function() {
      // individuel
      return knex("mandataire_tis").insert({
        ti_id: 4,
        mandataire_id: 1
      });
    })
    .then(function() {
      // prepose
      return knex("mandataire_tis").insert({
        ti_id: 4,
        mandataire_id: 2
      });
    })
    .then(function() {
      // service
      return knex("mandataire_tis").insert({
        ti_id: 4,
        mandataire_id: 4
      });
    });
};
