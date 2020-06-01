exports.up = function(knex) {
  return knex.raw(`
  alter table lb_departements add departement_financeur boolean;
  update lb_departements set departement_financeur = true where lb_user_id in (select lb_user_id from lb_departements group by lb_user_id having count(*) = 1);

  update lb_users set nom = null where nom = '';
  update lb_users set prenom = null where prenom = '';
  `);
};

exports.down = function(knex) {
  return knex.raw(`
  alter table lb_departements drop departement_financeur;
  `);
};
