exports.up = function (knex) {
  return knex.raw(`
DROP TRIGGER on_update_mesures ON mesures;
DROP FUNCTION update_gestionnaire_counters;


 CREATE OR REPLACE FUNCTION update_gestionnaire_counters() RETURNS trigger AS $$
  BEGIN
   IF (TG_OP = 'UPDATE' and new.antenne_id is not null) THEN
    perform update_antenne_counters(new.antenne_id);
    IF (old.antenne_id  <> new.antenne_id) THEN
      perform update_antenne_counters(old.antenne_id);
    END IF;
    return new;
   elseif (TG_OP = 'UPDATE' and new.mandataire_id is not null) then perform  update_mandataire_counters(new.mandataire_id); return new;
   elseif (TG_OP = 'INSERT' and new.antenne_id is not null) then perform  update_antenne_counters(new.antenne_id); return new;
   elseif (TG_OP = 'INSERT' and new.mandataire_id is not null) then perform  update_mandataire_counters(new.mandataire_id); return new;
   elseif (TG_OP = 'DELETE' and old.antenne_id is not null) then perform  update_antenne_counters(old.antenne_id); return old;
   elseif (TG_OP = 'DELETE' and old.mandataire_id is not null) then perform  update_mandataire_counters(old.mandataire_id); return old;
   end if;
  END;
 $$ language 'plpgsql';

CREATE TRIGGER on_update_mesures
 AFTER update of status, antenne_id or delete or insert ON mesures
 FOR EACH row
 EXECUTE PROCEDURE update_gestionnaire_counters();
  `);
};

exports.down = function (knex) {
  return knex.raw(`
DROP TRIGGER on_update_mesures ON mesures;
DROP FUNCTION update_gestionnaire_counters;

CREATE OR REPLACE FUNCTION update_gestionnaire_counters() RETURNS trigger AS $$
  BEGIN
   IF (TG_OP = 'UPDATE' and new.antenne_id is not null) THEN perform update_antenne_counters(new.antenne_id); return new;
   elseif (TG_OP = 'UPDATE' and new.mandataire_id is not null) then perform  update_mandataire_counters(new.mandataire_id); return new;
   elseif (TG_OP = 'INSERT' and new.antenne_id is not null) then perform  update_antenne_counters(new.antenne_id); return new;
   elseif (TG_OP = 'INSERT' and new.mandataire_id is not null) then perform  update_mandataire_counters(new.mandataire_id); return new;
   elseif (TG_OP = 'DELETE' and old.antenne_id is not null) then perform  update_antenne_counters(old.antenne_id); return old;
   elseif (TG_OP = 'DELETE' and old.mandataire_id is not null) then perform  update_mandataire_counters(old.mandataire_id); return old;
   end if;
  END;
 $$ language 'plpgsql';

CREATE TRIGGER on_update_mesures
 AFTER update of status or delete or insert ON mesures
 FOR EACH row
 EXECUTE PROCEDURE update_gestionnaire_counters();
  `);
};
