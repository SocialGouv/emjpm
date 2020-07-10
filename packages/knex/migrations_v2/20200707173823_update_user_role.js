exports.up = async function (knex) {
  const { rows } = await knex.raw(`
    select ur.user_id, ur.role_id, d.id, r.name
    from user_role as ur
    inner join role as r on r.id = ur.role_id
    inner join direction as d on d.user_id = ur.user_id
    where r."name" = 'direction_departemental' 
    or r."name" = 'direction_regional'
  `);

  for (var row of rows) {
    const { id, name } = row;
    let type = "";
    if (name === "direction_departemental") {
      type = "departemental";
    } else if (name === "direction_regional") {
      type = "regional";
    }
    await knex("direction").where({ id: id }).update({ type });
  }

  await knex("role").where({ name: "direction_departemental" }).update({
    name: "direction_territoriale",
  });

  const { id } = await knex
    .select()
    .table("role")
    .where({ name: "direction_territoriale" })
    .first();

  const directionRegionalRole = await knex
    .select()
    .table("role")
    .where({ name: "direction_regional" })
    .first();

  if (directionRegionalRole && directionRegionalRole.id) {
    await knex("user_role")
      .where({
        role_id: directionRegionalRole.id,
      })
      .update({
        role_id: id,
      });

    await knex("role").where({ id: directionRegionalRole.id }).del();
  }

  await knex("role")
    .where({
      name: "direction_national",
    })
    .update({
      name: "direction_nationale",
    });
};

exports.down = async function (knex) {
  await knex("role").where({ name: "direction_territoriale" }).update({
    name: "direction_departemental",
  });

  await knex("role").insert({
    name: "direction_regional",
  });

  await knex("role")
    .where({
      name: "direction_nationale",
    })
    .update({
      name: "direction_national",
    });
};
