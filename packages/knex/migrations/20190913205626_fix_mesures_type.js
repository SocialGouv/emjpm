exports.up = function (knex) {
  return knex.raw(`
  update mesures set "type" = 'Curatelle renforcée' where "type" = 'curatelle renforcée';
  update mesures set "type" = 'Curatelle renforcée aux biens et à la personne' where "type" = 'curatelle renforcée aux biens et à la personne';
  update mesures set "type" = 'Sauvegarde de justice avec mandat spécial' where "type" = 'sauvegarde de justice avec mandat spécial';
  update mesures set "type" = 'Tutelle aux biens' where "type" = 'tutelle aux biens';
  update mesures set "type" = 'Tutelle aux biens et à la personne' where "type" = 'tutelle aux biens et à la personne';
  `);
};

exports.down = function () {
  return Promise.resolve();
};
