CREATE OR REPLACE VIEW "public"."view_lb" AS 
 SELECT concat('service-', ser.id) AS uid,
    NULL::integer AS lb_user_id,
    ser.id AS service_id,
    NULL::integer AS mandataire_id,
    'service'::text AS user_type,
    ser.etablissement AS nom,
    ser.siret,
    ser.code_postal,
    ser.ville,
    ser.adresse AS adress,
    ser.email
   FROM services ser
UNION
 SELECT concat(lbu.type, '-', lbu.id) AS uid,
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
    lbu.email
   FROM lb_users lbu
     LEFT JOIN mandataires man ON (man.lb_user_id = lbu.id)
;
