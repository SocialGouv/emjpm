exports.seed = function(knex) {
  return knex("user_role")
    .del()
    .then(function() {
      return knex("user_role").insert([
        { role_id: 6, user_id: 1 },
        { role_id: 7, user_id: 1 }
      ]);
    });
};
