DROP TRIGGER IF EXISTS calculate_service_mesures ON "services";

CREATE OR REPLACE FUNCTION trigger_calculate_service_mesures()
    RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN

  IF NEW.mesures_in_progress IS NULL THEN
    UPDATE services SET mesures_in_progress = (SELECT COUNT(*) FROM mesures WHERE service_id=NEW.id AND status = 'en_cours') WHERE id = NEW.id;
  END IF;
  IF NEW.mesures_awaiting IS NULL THEN
    UPDATE services SET mesures_awaiting = (SELECT COUNT(*) FROM mesures WHERE service_id=NEW.id AND status = 'en_attente') WHERE id = NEW.id;
  END IF;

  RETURN NEW;

END;$$;

CREATE CONSTRAINT TRIGGER calculate_service_mesures
  AFTER UPDATE OF "mesures_in_progress","mesures_awaiting" ON "services"
  DEFERRABLE INITIALLY DEFERRED
  FOR EACH ROW
  WHEN (NEW.mesures_awaiting IS NULL OR NEW.mesures_in_progress IS NULL )
  EXECUTE PROCEDURE trigger_calculate_service_mesures();
