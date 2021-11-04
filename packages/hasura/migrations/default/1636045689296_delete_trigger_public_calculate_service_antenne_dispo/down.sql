CREATE TRIGGER "calculate_service_antenne_dispo"
AFTER UPDATE ON "public"."service_antenne"
FOR EACH ROW EXECUTE PROCEDURE trigger_calculate_service_antenne_dispo();
