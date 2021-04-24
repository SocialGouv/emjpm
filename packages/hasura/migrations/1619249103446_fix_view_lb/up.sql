CREATE OR REPLACE VIEW "public"."view_lb" AS 
 SELECT concat('service-', ser.id) AS uid,
    ser.id,
    ser.id AS service_id,
    NULL::integer AS mandataire_id,
    'service'::text AS user_type,
    ser.etablissement AS nom,
    dep.id AS departement_code,
    ser.siret,
    ser.code_postal,
    ser.ville,
    ser.adresse AS adress,
    ser.email
   FROM (services ser
     LEFT JOIN departements dep ON (((dep.id)::text = (ser.departement_code)::text)))
UNION
 SELECT concat(lbu.type, '-', man.id) AS uid,
    lbu.id,
    NULL::integer AS service_id,
    man.id AS mandataire_id,
        CASE
            WHEN ((lbu.type)::text = 'individuel'::text) THEN 'individuel'::text
            ELSE 'prepose'::text
        END AS user_type,
    concat(lbu.nom, ' ', lbu.prenom) AS nom,
    dep.id AS departement_code,
    lbu.siret,
    lbu.code_postal,
    lbu.ville,
    concat_ws(' '::text, lbu.adresse1, lbu.adresse2) AS adress,
    lbu.email
   FROM ((mandataires man
     LEFT JOIN departements dep ON (((dep.id)::text = (man.departement_code)::text)))
     JOIN lb_users lbu ON ((man.lb_user_id = lbu.id)));
