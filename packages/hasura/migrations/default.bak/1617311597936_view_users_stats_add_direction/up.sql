CREATE OR REPLACE VIEW "public"."view_users_stats" AS 
 SELECT users.id,
    users.type,
    users.created_at,
        CASE
            WHEN (users.type = 'ti') THEN tis.departement_code
            WHEN (users.type = 'individuel') THEN mandataires.departement_code
            WHEN (users.type = 'prepose') THEN mandataires.departement_code
            WHEN (users.type = 'service') THEN services.departement_code
            WHEN (users.type = 'direction' AND direction.type = 'departemental') THEN direction.departement_code
            ELSE NULL::character varying
        END AS departement_code
   FROM users
     LEFT JOIN magistrat ON magistrat.user_id = users.id
     LEFT JOIN tis ON magistrat.ti_id = tis.id
     LEFT JOIN mandataires ON mandataires.user_id = users.id
     LEFT JOIN service_members ON service_members.user_id = users.id
     LEFT JOIN services ON service_members.service_id = services.id
     LEFT JOIN direction ON direction.user_id = users.id
;
