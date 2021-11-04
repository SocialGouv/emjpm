CREATE TRIGGER "calculate_mandataire_mesures"
AFTER UPDATE ON "public"."mandataires"
FOR EACH ROW EXECUTE PROCEDURE trigger_calculate_mandataire_mesures();
