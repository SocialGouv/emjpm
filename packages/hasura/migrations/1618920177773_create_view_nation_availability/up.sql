CREATE OR REPLACE VIEW "public"."view_nation_availability" AS 
 SELECT sum(v.mesures_awaiting) AS mesures_awaiting,
    sum(v.mesures_in_progress) AS mesures_in_progress,
    sum(v.mesures_max) AS mesures_max
   FROM view_mesure_gestionnaire v;
