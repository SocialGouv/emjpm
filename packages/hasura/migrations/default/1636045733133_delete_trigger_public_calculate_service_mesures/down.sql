CREATE TRIGGER "calculate_service_mesures"
AFTER UPDATE ON "public"."services"
FOR EACH ROW EXECUTE PROCEDURE trigger_calculate_service_mesures();
