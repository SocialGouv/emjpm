CREATE OR REPLACE VIEW "public"."view_mesure_gestionnaire" AS 
 SELECT concat('service-', ser.id) AS id,
    ser.id AS service_id,
    NULL::integer AS mandataire_id,
    'SERVICE'::text AS discriminator,
    ser.etablissement AS nom,
    dep.id AS departement_code,
    dep.nom AS dep_nom,
    ser.dispo_max AS mesures_max,
    ser.mesures_awaiting,
    ser.mesures_in_progress,
    ((ser.dispo_max - ser.mesures_awaiting) - ser.mesures_in_progress) AS remaining_capacity,
    ser.mesures_last_update
   FROM (services ser
     LEFT JOIN service_departements sdep ON sdep.service_id = ser.id
     LEFT JOIN departements dep ON (((dep.id)::text = (sdep.departement_code)::text)))
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
    man.mesures_en_attente AS mesures_awaiting,
    man.mesures_en_cours AS mesures_in_progress,
    ((man.dispo_max - man.mesures_en_attente) - man.mesures_en_cours) AS remaining_capacity,
    man.mesures_last_update
   FROM ((mandataires man
     LEFT JOIN departements dep ON (((dep.id)::text = (man.departement_code)::text)))
     LEFT JOIN users u ON ((man.user_id = u.id)));
