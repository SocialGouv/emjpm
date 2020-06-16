exports.up = async function (knex) {
  await knex.raw(`
  -- mandataire / service inscrit par departement
create view view_indicateur_inscrit as select d.nom, u.type, count(m.id) from mandataires m, users u, departements d
	where m.department_id = d.id and m.user_id = u.id and u.active = true
	group by d.nom, u.type
union
select d.nom, u.type, count(distinct(sm.service_id)) from users u, departements d, service_members sm, services s
	where u.active = true and u.id = sm.user_id and sm.service_id = s.id and s.department_id = d.id
	group by d.nom, u.type;

-- mandataire / service login dernier mois par departement
create view view_indicateur_login as select d.nom, u.type, count(m.id) from mandataires m, users u, departements d
	where m.department_id = d.id and m.user_id = u.id and u.active = true and u.last_login > now() - interval '1 month'
	group by d.nom, u.type
union
select d.nom, u.type, count(distinct(sm.service_id)) from users u, departements d, service_members sm, services s
	where u.active = true and u.id = sm.user_id and sm.service_id = s.id and s.department_id = d.id and u.last_login > now() - interval '1 month'
  group by d.nom, u.type;
  `);
};

exports.down = async function (knex) {
  await knex.raw(`
		DROP VIEW IF EXISTS view_indicateur_inscrit
	`);

  await knex.raw(`
		DROP VIEW IF EXISTS view_indicateur_login
	`);
};
