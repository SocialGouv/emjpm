exports.up = async function(knex) {
  await knex.raw(
    "CREATE UNIQUE INDEX enquete_reponses_mandataire ON enquete_reponses (enquete_id, mandataire_id) WHERE (mandataire_id is NOT null);"
  );
  await knex.raw(
    "CREATE UNIQUE INDEX enquete_reponses_service ON enquete_reponses (enquete_id, service_id) WHERE (service_id is NOT null);"
  );
};

exports.down = async function(knex) {
  await knex.raw("CREATE UNIQUE INDEX enquete_reponses_mandataire;");
  await knex.raw("CREATE UNIQUE INDEX enquete_reponses_service;");
};
