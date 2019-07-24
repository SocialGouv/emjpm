exports.seed = function(knex) {
  return knex("service_antenne")
    .del() // Deletes ALL existing entries
    .then(async function() {
      const services = await knex("services");
      return Promise.all(
        services.map(service =>
          knex("service_antenne").insert({
            service_id: service.id,
            name: service.etablissement
          })
        )
      );
    });
};
