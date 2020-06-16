exports.up = function (knex) {
  return knex.raw(`
alter table individuel_exercices add secretariat_specialise boolean;
alter table individuel_exercices add secretariat_specialise_etp real;

alter table individuel_exercices drop secretaire_specialise;
alter table individuel_exercices drop secretaire_specialise_etp;

update individuel_exercices set secretariat_specialise = (
  select secretariat from mandataires where id = individuel_exercices.mandataire_id
);
update individuel_exercices set secretariat_specialise_etp = (
  select nb_secretariat from mandataires where id = individuel_exercices.mandataire_id
);

alter table mandataires drop secretariat;
alter table mandataires drop nb_secretariat;
`);
};

exports.down = function (knex) {
  return knex.raw(`
  alter table individuel_exercices drop secretariat_specialise;
  alter table individuel_exercices drop secretariat_specialise_etp;

  alter table individuel_exercices add secretaire_specialise boolean;
  alter table individuel_exercices add secretaire_specialise_etp varchar;

  alter table mandataires add secretariat boolean;
  alter table mandataires add nb_secretariat real;
    `);
};
