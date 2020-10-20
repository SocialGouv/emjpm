
exports.up = function(knex) {
  return knex.raw(`
  alter table commentaires drop column antenne_id;
  alter table lb_departements drop column individuel;
  alter table lb_departements drop column prepose;
  alter table lb_departements drop column ti;
  alter table lb_departements drop column service;
  alter table mesures drop column etablissement;
  alter table mandataires drop column etablissement;
  `);
};

exports.down = function() {

};
