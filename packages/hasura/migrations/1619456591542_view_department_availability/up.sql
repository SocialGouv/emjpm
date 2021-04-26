CREATE OR REPLACE VIEW "public"."view_department_availability" AS 
 SELECT v.departement_code,
    d.id_region AS region_id,
    sum(v.mesures_awaiting) AS mesures_awaiting,
    sum(v.mesures_in_progress) AS mesures_in_progress,
    sum(v.mesures_max) AS mesures_max
   FROM (view_mesure_gestionnaire_departement v
     JOIN departements d ON (((v.departement_code)::text = (d.id)::text)))
  GROUP BY v.departement_code, d.id_region;
