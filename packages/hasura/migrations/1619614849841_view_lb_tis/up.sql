CREATE OR REPLACE VIEW "public"."view_lb_tis" AS 
 SELECT concat('service-', ser.id) AS uid,
    sti.ti_id as ti_id,
    NULL::integer AS lb_user_id,
    ser.id AS service_id,
    NULL::integer AS mandataire_id,
    'service'::text AS user_type,
    ser.etablissement AS nom,
    ser.siret,
    ser.code_postal,
    ser.ville,
    ser.adresse AS adress,
    ser.email,
    dep.id as departement_code,
    ser.dispo_max AS mesures_max,
    ser.mesures_awaiting,
    ser.mesures_in_progress,
    (
    (ser.dispo_max - ser.mesures_awaiting) - ser.mesures_in_progress
    ) AS remaining_capacity
 FROM
    services ser
    LEFT JOIN departements dep ON (((dep.id) :: text = (ser.departement_code) :: text))
    LEFT JOIN service_tis sti ON sti.service_id = ser.id
UNION
 SELECT concat(lbu.type, '-', lbu.id) AS uid,
    mti.ti_id as ti_id,
    lbu.id AS lb_user_id,
    NULL::integer AS service_id,
    man.id AS mandataire_id,
    CASE
        WHEN ((lbu.type)::text = 'individuel'::text) THEN 'individuel'::text
        ELSE 'prepose'::text
    END AS user_type,
    concat(lbu.nom, ' ', lbu.prenom) AS nom,
    lbu.siret,
    lbu.code_postal,
    lbu.ville,
    concat_ws(' '::text, lbu.adresse1, lbu.adresse2) AS adress,
    lbu.email,
    dep.id as departement_code,
    man.dispo_max AS mesures_max,
    man.mesures_en_attente AS mesures_awaiting,
    man.mesures_en_cours AS mesures_in_progress,
    (
    (man.dispo_max - man.mesures_en_attente) - man.mesures_en_cours
    ) AS remaining_capacity
 FROM lb_users lbu
    LEFT JOIN mandataires man ON ((man.lb_user_id = lbu.id))
    LEFT JOIN mandataire_tis mti ON mti.mandataire_id = man.id
    LEFT JOIN lb_departements lbd ON ((lbu.id = lbd.lb_user_id))
    LEFT JOIN departements dep ON (((lbd.departement_code) :: text = (dep.id) :: text))
;
