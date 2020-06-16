exports.seed = function (knex) {
  return knex("magistrat")
    .del() // Deletes ALL existing entries
    .then(function () {
      // Inserts seed entries one by one in series
      return knex("magistrat").insert({
        ti_id: 1,
        user_id: 32,
      });
    });
};
