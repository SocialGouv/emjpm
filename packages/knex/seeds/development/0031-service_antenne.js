exports.seed = async function(knex) {
  await knex("service_antenne").del();
  const services = await knex("services");
  return Promise.all(
    services.map(service =>
      knex("service_antenne").insert({
        service_id: service.id,
        name: service.etablissement
      })
    )
  );
};
