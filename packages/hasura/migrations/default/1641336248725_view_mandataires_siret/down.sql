-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP VIEW "view_mandataires_siret";
-- CREATE OR REPLACE VIEW "public"."view_mandataires_siret" AS
--  SELECT lb.siret
--    FROM (mandataires m
--      JOIN liste_blanche lb ON ((lb.id = m.liste_blanche_id)))
--   WHERE (lb.siret IS NOT NULL);
