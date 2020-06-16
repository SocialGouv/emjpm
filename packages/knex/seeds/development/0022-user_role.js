exports.seed = async function (knex) {
  const users = await knex("users");
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
