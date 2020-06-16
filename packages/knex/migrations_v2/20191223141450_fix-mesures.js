exports.up = function (knex) {
  return knex.raw(`
  update mesures set "type" = 'Curatelle renforcée' where "type" = 'curatelle renforcée';
  update mesures set "type" = 'Curatelle renforcée aux biens et à la personne' where "type" = 'curatelle renforcée aux biens et à la personne';
  update mesures set "type" = 'Sauvegarde de justice avec mandat spécial' where "type" = 'sauvegarde de justice avec mandat spécial';
  update mesures set "type" = 'Tutelle aux biens' where "type" = 'tutelle aux biens';
  update mesures set "type" = 'Tutelle à la personne' where "type" = 'tutelle à la personne';
  update mesures set "type" = 'Tutelle aux biens et à la personne' where "type" = 'tutelle aux biens et à la personne';
  update mesures set "type" = 'Tutelle' where "type" = 'tutelle';
  update mesures set "type" = 'Curatelle renforcée aux biens et à la personne' where "type" = 'curatelle renforcée aux biens et à la personne';
  update mesures set "type" = 'Curatelle renforcée à la personne' where "type" = 'curatelle renforcée à la personne';
  update mesures set "type" = 'Curatelle renforcée aux biens' where "type" = 'curatelle renforcée aux biens';
  update mesures set "type" = 'Curatelle simple aux biens et à la personne' where "type" = 'curatelle simple aux biens et à la personne';
  update mesures set "type" = 'Curatelle simple à la personne' where "type" = 'curatelle simple à la personne';
  update mesures set "type" = 'Curatelle simple aux biens' where "type" = 'curatelle simple aux biens';
  update mesures set "type" = 'Sauvegarde de justice' where "type" = 'sauvegarde de justice';

  update mesures set "residence" = 'A domicile' where residence = 'A Domicile';
  update mesures set "residence" = 'En établissement' where residence = 'En etablissement';
  update mesures set "residence" = 'En établissement' where residence = 'En Etablissement';
  update mesures set "residence" = null where residence = 'non reseigné';

  `);
};

exports.down = function () {
  return Promise.resolve();
};
