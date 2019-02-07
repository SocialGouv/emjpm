exports.seed = function(knex, Promise) {
  return knex("user_tis")
    .del() // Deletes ALL existing entries
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("user_tis").insert({
        ti_id: 4,
        user_id: 4
      });
    })
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("user_tis").insert({
        ti_id: 4,
        user_id: 1
      });
    })
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("user_tis").insert({
        ti_id: 4,
        user_id: 2
      });
    })
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("user_tis").insert({
        ti_id: 4,
        user_id: 3
      });
    });
};
