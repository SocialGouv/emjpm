exports.up = function (knex) {
  return knex.raw(`
alter table service_antenne drop date_mesure_update;
alter table service_antenne drop bak_mandataire_id;

alter table mandataires drop date_mesure_update;

DROP TRIGGER mandataires_updated_at on mandataires;
drop function if exists on_update_timestamp;
  `);
};

exports.down = function (knex) {};
