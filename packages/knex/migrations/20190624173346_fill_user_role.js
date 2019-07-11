exports.up = function(knex, Promise) {
  const users = knex("users");

  return Promise.all(
    users.map(async user => {
      const role = await knex("role")
        .select("id")
        .where("name", user.type)
        .first();
      return knex("user_role").insert({
        role_id: role.id,
        user_id: user.id
      });
    })
  );
};

exports.down = function(knex, Promise) {
  const user_roles = knex("user_role");
  return Promise.all(
    user_roles.map(user_role => {
      return user_role.del();
    })
  );
};
