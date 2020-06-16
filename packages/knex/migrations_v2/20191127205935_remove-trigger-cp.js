exports.up = function (knex) {
  return knex.raw(`
DROP TRIGGER on_update_mesures_code_postal ON mesures;
DROP FUNCTION update_mesures_departement;
  `);
};

exports.down = function (knex) {
  return knex.raw(`
CREATE OR REPLACE FUNCTION update_mesures_departement() RETURNS trigger AS $$
  BEGIN
   update mesures set department_id = (
     select departements.id from departements where departements.code = substring(NEW.code_postal, 0,3)
   ) where id = NEW.id;
   return NEW;
  END;
$$ language 'plpgsql';

CREATE TRIGGER on_update_mesures_code_postal
 AFTER update of code_postal or insert ON mesures
 FOR EACH row
 EXECUTE PROCEDURE update_mesures_departement();
  `);
};
