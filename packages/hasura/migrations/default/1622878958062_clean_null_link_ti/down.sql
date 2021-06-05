-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DELETE FROM mandataire_tis WHERE ti_id IS NULL;
DELETE FROM service_tis WHERE ti_id IS NULL;
