exports.seed = function (knex) {
  return knex("service_members")
    .del() // Deletes ALL existing entries
    .then(function () {
      // Inserts seed entries one by one in series
      return knex("service_members").insert({
        user_id: 3,
        service_id: 1,
      });
    });
};
