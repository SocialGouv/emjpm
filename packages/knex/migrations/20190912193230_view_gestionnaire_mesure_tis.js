exports.up = function (knex) {
  return knex.raw(`
create view view_mesure_gestionnaire_tis AS
  select concat(u.type,'-',m.id) id
        , NULL service_id
        , m.id mandataire_id
        , case when u.type = 'individuel' then 'MANDATAIRE_IND' else 'MANDATAIRE_PRE' end discriminator
        , uti.ti_id ti_id
      from users u, user_tis uti, mandataires m where u.id = m.user_id and u.id = uti.user_id
union
  select concat('service-', sti.service_id) id
        , sti.service_id service_id
        , NULL mandataire_id
        , 'SERVICE' discriminator
        , sti.ti_id ti_id
      from service_tis sti;
  `);
};

exports.down = function (knex) {
  return knex.raw(`
drop view view_mesure_gestionnaire_tis;
  `);
};
