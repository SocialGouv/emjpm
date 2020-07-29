exports.up = function (knex) {
  return knex.raw(`
drop table individuel_agrement_departements;
drop table individuel_agrements;
drop table individuel_exercices;
drop table individuel_formations;
drop table service_personnels;
  `);
};

exports.down = function (knex) {};
