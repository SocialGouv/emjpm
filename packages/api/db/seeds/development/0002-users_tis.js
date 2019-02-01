exports.seed = function(knex, Promise) {
  return knex("users_tis")
    .del() // Deletes ALL existing entries
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("users_tis").insert({
        ti_id: 4,
        user_id: 4,
        cabinet: "6D",
        email: "test@ti.com"
      });
    });
};
