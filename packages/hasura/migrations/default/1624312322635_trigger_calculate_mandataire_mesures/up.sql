DROP TRIGGER IF EXISTS calculate_mandataire_mesures ON "mandataires";

CREATE OR REPLACE FUNCTION trigger_calculate_mandataire_mesures()
    RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN

  IF NEW.mesures_en_cours IS NULL THEN
    UPDATE mandataires SET mesures_en_cours = (SELECT COUNT(*) FROM mesures WHERE mandataire_id=NEW.id AND status = 'en_cours') WHERE id = NEW.id;
  END IF;
  IF NEW.mesures_en_attente IS NULL THEN
    UPDATE mandataires SET mesures_en_attente = (SELECT COUNT(*) FROM mesures WHERE mandataire_id=NEW.id AND status = 'en_attente') WHERE id = NEW.id;
  END IF;

  RETURN NEW;

END;$$;

CREATE CONSTRAINT TRIGGER calculate_mandataire_mesures
  AFTER UPDATE OF "mesures_en_cours","mesures_en_attente" ON "mandataires"
  DEFERRABLE INITIALLY DEFERRED
  FOR EACH ROW
  WHEN (NEW.mesures_en_attente IS NULL OR NEW.mesures_en_cours IS NULL )
  EXECUTE PROCEDURE trigger_calculate_mandataire_mesures();
