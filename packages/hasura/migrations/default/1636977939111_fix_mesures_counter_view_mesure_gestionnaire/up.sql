CREATE OR REPLACE VIEW "public"."view_mesure_gestionnaire" AS 
 SELECT concat('service-', ser.id) AS id,
    ser.id AS service_id,
    NULL::integer AS mandataire_id,
    'SERVICE'::text AS discriminator,
    ser.etablissement AS nom,
    dep.id AS departement_code,
    dep.nom AS dep_nom,
    ser.dispo_max AS mesures_max,
    count_service_mesures_awaiting(ser.*)::int AS mesures_awaiting,
    count_service_mesures_in_progress(ser.*)::int AS mesures_in_progress,
    ((ser.dispo_max - count_service_mesures_awaiting(ser.*)::int) - count_service_mesures_in_progress(ser.*)::int) AS remaining_capacity,
    ser.mesures_last_update,
    ser.suspend_activity
   FROM ((services ser
     LEFT JOIN service_departements sdep ON ((sdep.service_id = ser.id)))
     LEFT JOIN departements dep ON (((dep.id)::text = sdep.departement_code)))
UNION
 SELECT concat(u.type, '-', man.id) AS id,
    NULL::integer AS service_id,
    man.id AS mandataire_id,
        CASE
            WHEN ((u.type)::text = 'individuel'::text) THEN 'MANDATAIRE_IND'::text
            ELSE 'MANDATAIRE_PRE'::text
        END AS discriminator,
    concat(u.nom, ' ', u.prenom) AS nom,
    dep.id AS departement_code,
    dep.nom AS dep_nom,
    man.dispo_max AS mesures_max,
    count_mandataire_mesures_en_attente(man.*)::int AS mesures_awaiting,
    count_mandataire_mesures_en_cours(man.*)::int AS mesures_in_progress,
    ((man.dispo_max - count_mandataire_mesures_en_attente(man.*)::int) - count_mandataire_mesures_en_cours(man.*)::int) AS remaining_capacity,
    man.mesures_last_update,
    man.suspend_activity
   FROM ((mandataires man
     LEFT JOIN departements dep ON (((dep.id)::text = (man.departement_code)::text)))
     LEFT JOIN users u ON ((man.user_id = u.id)));
