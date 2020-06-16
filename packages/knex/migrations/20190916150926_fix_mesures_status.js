exports.up = function (knex) {
  return knex.raw(`
update mesures set "status" = 'Mesure en cours' where "status" = 'Mesure service';
update mesures set "status" = 'Mesure en cours' where "status" = 'Mesure Service';
update mesures set "status" = 'Eteindre mesure' where "status" = 'eteinte';
update mesures set "status" = 'Eteindre mesure' where "status" = 'MD';
update mesures set "status" = 'Mesure en attente' where "status" = 'attente juge';
delete from mesures where status in ('juge annulation', 'Annulation mesure juge');

update mandataires set mesures_en_attente = (
	select count(ms.id) from mesures ms
		where ms.mandataire_id = mandataires.id
		and ms.status = 'Mesure en attente'
);

update mandataires set mesures_en_cours = (
	select count(ms.id) from mesures ms
		where ms.mandataire_id = mandataires.id
		and ms.status = 'Mesure en cours'
);

update service_antenne set mesures_awaiting = (
	select count(ms.id) from mesures ms
		where ms.antenne_id = service_antenne.id
		and ms.status = 'Mesure en attente'
);

update service_antenne set mesures_in_progress = (
	select count(ms.id) from mesures ms
		where ms.antenne_id = service_antenne.id
		and ms.status = 'Mesure en cours'
);
  `);
};

exports.down = function () {
  return Promise.resolve();
};
