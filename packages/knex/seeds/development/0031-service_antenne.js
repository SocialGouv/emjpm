exports.seed = function(knex) {
  return knex("service_antenne")
    .del() // Deletes ALL existing entries
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("services");
    })
    .then(function(services) {
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
