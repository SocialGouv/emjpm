CREATE OR REPLACE VIEW "public"."view_mandataires_siret" AS 
 SELECT siret::text
   FROM mandataires;
