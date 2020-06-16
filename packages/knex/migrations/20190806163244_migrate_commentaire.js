exports.up = function (knex) {
  return knex.raw(
    `
    update commentaires c set antenne_id = (select id from service_antenne where bak_mandataire_id = c.mandataire_id);
    update commentaires set mandataire_id = null where antenne_id is not null;
    `
  );
};

exports.down = function () {
  return Promise.resolve();
};
