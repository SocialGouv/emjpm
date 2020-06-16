exports.up = async function (knex) {
  const users = await knex("users").select(["type", "id"]);

  return Promise.all(
    users.map(async (user) => {
      const role = await knex("role")
        .select("id")
        .where("name", user.type)
        .first();
      return knex("user_role").insert({
        role_id: role.id,
        user_id: user.id,
      });
    })
  );
};

exports.down = async function (knex) {
  const user_roles = await knex("user_role").select("id");
  return Promise.all(
    user_roles.map(({ id }) => {
      return knex("user_role").where("id", id).del();
    })
  );
};
