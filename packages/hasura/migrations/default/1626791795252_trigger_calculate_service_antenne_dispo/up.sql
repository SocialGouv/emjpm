DROP TRIGGER IF EXISTS calculate_service_antenne_dispo ON "service_antenne";

CREATE OR REPLACE FUNCTION trigger_calculate_service_antenne_dispo()
    RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN

  UPDATE service_antenne SET dispo = NEW.mesures_max-(NEW.mesures_in_progress+NEW.mesures_awaiting) WHERE id = NEW.id;
  RETURN NEW;

END;$$;

CREATE CONSTRAINT TRIGGER calculate_service_antenne_dispo
  AFTER UPDATE OF "mesures_in_progress","mesures_awaiting", "mesures_max" ON "service_antenne"
  DEFERRABLE INITIALLY DEFERRED
  FOR EACH ROW
  WHEN (NEW.mesures_max IS NOT NULL AND NEW.mesures_in_progress IS NOT NULL)
  EXECUTE PROCEDURE trigger_calculate_service_antenne_dispo();
