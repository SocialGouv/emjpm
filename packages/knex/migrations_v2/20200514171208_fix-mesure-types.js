exports.up = function(knex) {
  return knex.raw(`
 update mesures set type = 'mesure ad hoc' where type = 'ad hoc';
 update mesures set type = 'mesure ad hoc' where type = 'curatelle ad hoc';
 update mesures set type = 'mesure ad hoc' where type = 'curatelle ad''hoc';
 update mesures set type = 'curatelle renforcée' where type = 'curatelle aménagée';
 update mesures set type = 'curatelle simple aux biens' where type = 'curatelle aux biens';
 update mesures set type = 'curatelle renforcée aux biens' where type = 'curatelle renforcã©e aux biens';
 update mesures set type = 'curatelle renforcée aux biens et à la personne' where type = 'curatelle renforcã©e aux biens et ã  la personne';
 update mesures set type = 'curatelle renforcée' where type = 'curatelle renforc�e';
 update mesures set type = 'curatelle renforcée aux biens' where type = 'curatelle renforc�e aux biens';
 update mesures set type = 'curatelle renforcée aux biens et à la personne' where type = 'curatelle renforc�e aux biens et � la personne';
 update mesures set type = 'curatelle renforcée aux biens et à la personne' where type = 'curatelle renforcée aux  biens et de la personne';
 update mesures set type = 'curatelle renforcée aux biens et à la personne' where type = 'curatelle renforcée biens et personne';
 update mesures set type = 'curatelle renforcée à la personne' where type = 'curatelle renforc�e � la personne';
 update mesures set type = 'curatelle simple aux biens et à la personne' where type = 'curatelle simple aux  biens et de la personne';
 update mesures set type = 'curatelle simple aux biens et à la personne' where type = 'curatelle simple aux biens et � la personne';
 update mesures set type = 'sauvegarde de justice avec mandat spécial' where type = 'mandataire spécial';
 update mesures set type = 'sauvegarde de justice avec mandat spécial' where type = 'sauvegarde de justice avec mandataire spécial';
 update mesures set type = 'sauvegarde de justice avec mandat spécial' where type = 'sauvegarde de justice avec mandat spã©cial';
 update mesures set type = 'sauvegarde de justice avec mandat spécial' where type = 'sauvegarde de justice avec mandat sp�cial';
 update mesures set type = 'tutelle aux biens et à la personne' where type = 'tutelle aux biens et ã  la personne';
 update mesures set type = 'tutelle aux biens et à la personne' where type = 'tutelle aux biens et de la personne';
 update mesures set type = 'tutelle aux biens et à la personne' where type = 'tutelle aux biens et � la personne';
 update mesures set type = 'tutelle aux biens et à la personne' where type = 'tutelle biens et personne';
 update mesures set type = 'mesure ad hoc ' where type = 'tuteur ad''hoc';
 update mesures set type = trim(type);
  `);
};

exports.down = function(knex) {};
