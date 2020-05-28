exports.up = function(knex) {
  return knex.raw(`
  alter table lb_users add type varchar null;
  update lb_users set type = 'ti' where email like '%@justice.fr';
  update lb_users set type = 'ti' where email like '%@justice.gouv.fr';
  update lb_departements set ti = true where lb_user_id in (select id from lb_users where type = 'ti');
  update lb_users set type = (select type from users where users.id = lb_users.user_id) where user_id is not null;

  update lb_users set type = 'individuel' where type is null
      and id in (select lb_user_id from lb_departements where individuel = true);
  update lb_users set type = 'prepose' where type is null
      and id in (select lb_user_id from lb_departements where prepose = true);
  update lb_users set type = 'service' where type is null
      and id in (select lb_user_id from lb_departements where service = true);

  delete from lb_structures where lb_departement_id in (select id from lb_departements where individuel = false and prepose = false and service = false and ti = false);
  delete from lb_tribunaux where lb_departement_id in (select id from lb_departements where individuel = false and prepose = false and service = false and ti = false);
  delete from lb_departements where individuel = false and prepose = false and service = false and ti = false;
  delete from lb_users where user_id is null and id not in (select lb_user_id from lb_departements);
  delete from lb_departements where departement_id is null;

  `);
};

exports.down = function(knex) {
  return knex.raw(`
  alter table lb_users drop column;
  `);
};
