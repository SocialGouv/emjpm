exports.seed = function(knex) {
  return knex("user_antenne")
    .del() // Deletes ALL existing entries
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("user_antenne").insert({
        user_id: 3,
        antenne_id: 1
      });
    });
};
