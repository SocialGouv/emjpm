CREATE OR REPLACE VIEW "public"."view_lb_tis" AS 
 SELECT concat('service-', ser.id) AS uid,
    NULL::integer AS ti_id,
    NULL::integer AS liste_blanche_id,
    ser.id AS service_id,
    NULL::integer AS mandataire_id,
    'service'::text AS user_type,
    ser.etablissement AS nom,
    ser.siret,
    ser.code_postal,
    ser.ville,
    ser.adresse AS adress,
    ser.email,
    dep.id AS departement_code,
        CASE
            WHEN (ser.suspend_activity IS NOT TRUE) THEN ser.dispo_max
            ELSE 0
        END AS mesures_max,
    (count_service_mesures_awaiting(ser.*))::integer AS mesures_awaiting,
    (count_service_mesures_in_progress(ser.*))::integer AS mesures_in_progress,
        CASE
            WHEN (ser.suspend_activity IS NOT TRUE) THEN ((ser.dispo_max - (count_service_mesures_awaiting(ser.*))::integer) - (count_service_mesures_in_progress(ser.*))::integer)
            ELSE 0
        END AS remaining_capacity,
    false AS prefer,
    true AS habilitation,
    (
        CASE
            WHEN (ser.suspend_activity IS NOT TRUE) THEN ((ser.dispo_max - (count_service_mesures_awaiting(ser.*))::integer) - (count_service_mesures_in_progress(ser.*))::integer)
            ELSE 0
        END > 0) AS available,
    gcp.latitude,
    gcp.longitude,
    NULL::double precision AS distance
   FROM (((services ser
     JOIN service_departements sdep ON ((sdep.service_id = ser.id)))
     JOIN departements dep ON (((dep.id)::text = sdep.departement_code)))
     LEFT JOIN geolocalisation_code_postal gcp ON (((gcp.code_postal)::text = (ser.code_postal)::text)))
UNION
 SELECT concat('service-', ser.id) AS uid,
    sti.ti_id,
    NULL::integer AS liste_blanche_id,
    ser.id AS service_id,
    NULL::integer AS mandataire_id,
    'service'::text AS user_type,
    ser.etablissement AS nom,
    ser.siret,
    ser.code_postal,
    ser.ville,
    ser.adresse AS adress,
    ser.email,
    NULL::character varying(255) AS departement_code,
        CASE
            WHEN (ser.suspend_activity IS NOT TRUE) THEN ser.dispo_max
            ELSE 0
        END AS mesures_max,
    (count_service_mesures_awaiting(ser.*))::integer AS mesures_awaiting,
    (count_service_mesures_in_progress(ser.*))::integer AS mesures_in_progress,
        CASE
            WHEN (ser.suspend_activity IS NOT TRUE) THEN ((ser.dispo_max - (count_service_mesures_awaiting(ser.*))::integer) - (count_service_mesures_in_progress(ser.*))::integer)
            ELSE 0
        END AS remaining_capacity,
    true AS prefer,
    true AS habilitation,
    (
        CASE
            WHEN (ser.suspend_activity IS NOT TRUE) THEN ((ser.dispo_max - (count_service_mesures_awaiting(ser.*))::integer) - (count_service_mesures_in_progress(ser.*))::integer)
            ELSE 0
        END > 0) AS available,
    gcp.latitude,
    gcp.longitude,
    NULL::double precision AS distance
   FROM ((services ser
     JOIN service_tis sti ON ((sti.service_id = ser.id)))
     LEFT JOIN geolocalisation_code_postal gcp ON (((gcp.code_postal)::text = (ser.code_postal)::text)))
UNION
 SELECT concat('individuel-', man.id) AS uid,
    NULL::integer AS ti_id,
    lb.id AS liste_blanche_id,
    NULL::integer AS service_id,
    man.id AS mandataire_id,
    'individuel'::text AS user_type,
    concat(lb.nom, ' ', lb.prenom) AS nom,
    lb.siret,
    lb.code_postal,
    lb.ville,
    concat_ws(' '::text, lb.adresse, lb.adresse_complement) AS adress,
    lb.email,
    dep.id AS departement_code,
        CASE
            WHEN (man.suspend_activity IS NOT TRUE) THEN man.dispo_max
            ELSE 0
        END AS mesures_max,
    (count_mandataire_mesures_en_attente(man.*))::integer AS mesures_awaiting,
    (count_mandataire_mesures_en_cours(man.*))::integer AS mesures_in_progress,
        CASE
            WHEN (man.suspend_activity IS NOT TRUE) THEN ((man.dispo_max - (count_mandataire_mesures_en_attente(man.*))::integer) - (count_mandataire_mesures_en_cours(man.*))::integer)
            ELSE 0
        END AS remaining_capacity,
    false AS prefer,
        CASE
            WHEN (lb.id IS NOT NULL) THEN true
            ELSE false
        END AS habilitation,
    (
        CASE
            WHEN (man.suspend_activity IS NOT TRUE) THEN ((man.dispo_max - (count_mandataire_mesures_en_attente(man.*))::integer) - (count_mandataire_mesures_en_cours(man.*))::integer)
            ELSE 0
        END > 0) AS available,
    gcp.latitude,
    gcp.longitude,
    NULL::double precision AS distance
   FROM (((((mandataires man
     JOIN users u ON ((u.id = man.user_id)))
     LEFT JOIN liste_blanche lb ON ((man.liste_blanche_id = lb.id)))
     LEFT JOIN mandataire_individuel_departements lbd ON ((lb.id = lbd.liste_blanche_id)))
     LEFT JOIN departements dep ON (((lbd.departement_code)::text = (dep.id)::text)))
     LEFT JOIN geolocalisation_code_postal gcp ON (((gcp.code_postal)::text = (man.code_postal)::text)))
  WHERE ((u.type)::text = 'individuel'::text)
UNION
 SELECT concat('individuel-', man.id) AS uid,
    mti.ti_id,
    lb.id AS liste_blanche_id,
    NULL::integer AS service_id,
    man.id AS mandataire_id,
    'individuel'::text AS user_type,
    concat(lb.nom, ' ', lb.prenom) AS nom,
    lb.siret,
    lb.code_postal,
    lb.ville,
    concat_ws(' '::text, lb.adresse, lb.adresse_complement) AS adress,
    lb.email,
    NULL::character varying(255) AS departement_code,
        CASE
            WHEN (man.suspend_activity IS NOT TRUE) THEN man.dispo_max
            ELSE 0
        END AS mesures_max,
    (count_mandataire_mesures_en_attente(man.*))::integer AS mesures_awaiting,
    (count_mandataire_mesures_en_cours(man.*))::integer AS mesures_in_progress,
        CASE
            WHEN (man.suspend_activity IS NOT TRUE) THEN ((man.dispo_max - (count_mandataire_mesures_en_attente(man.*))::integer) - (count_mandataire_mesures_en_cours(man.*))::integer)
            ELSE 0
        END AS remaining_capacity,
    true AS prefer,
        CASE
            WHEN (lb.id IS NOT NULL) THEN true
            ELSE false
        END AS habilitation,
    (
        CASE
            WHEN (man.suspend_activity IS NOT TRUE) THEN ((man.dispo_max - (count_mandataire_mesures_en_attente(man.*))::integer) - (count_mandataire_mesures_en_cours(man.*))::integer)
            ELSE 0
        END > 0) AS available,
    gcp.latitude,
    gcp.longitude,
    NULL::double precision AS distance
   FROM ((((mandataires man
     JOIN users u ON ((u.id = man.user_id)))
     LEFT JOIN liste_blanche lb ON ((man.liste_blanche_id = lb.id)))
     JOIN mandataire_tis mti ON ((mti.mandataire_id = man.id)))
     LEFT JOIN geolocalisation_code_postal gcp ON (((gcp.code_postal)::text = (man.code_postal)::text)))
  WHERE ((u.type)::text = 'individuel'::text)
UNION
 SELECT concat('prepose-', man.id) AS uid,
    NULL::integer AS ti_id,
    lb.id AS liste_blanche_id,
    NULL::integer AS service_id,
    man.id AS mandataire_id,
    'prepose'::text AS user_type,
    concat(lb.nom, ' ', lb.prenom) AS nom,
    lb.siret,
    lb.code_postal,
    lb.ville,
    concat_ws(' '::text, lb.adresse, lb.adresse_complement) AS adress,
    lb.email,
    dep.id AS departement_code,
        CASE
            WHEN (man.suspend_activity IS NOT TRUE) THEN man.dispo_max
            ELSE 0
        END AS mesures_max,
    (count_mandataire_mesures_en_attente(man.*))::integer AS mesures_awaiting,
    (count_mandataire_mesures_en_cours(man.*))::integer AS mesures_in_progress,
        CASE
            WHEN (man.suspend_activity IS NOT TRUE) THEN ((man.dispo_max - (count_mandataire_mesures_en_attente(man.*))::integer) - (count_mandataire_mesures_en_cours(man.*))::integer)
            ELSE 0
        END AS remaining_capacity,
    false AS prefer,
        CASE
            WHEN (lb.id IS NOT NULL) THEN true
            ELSE false
        END AS habilitation,
    (
        CASE
            WHEN (man.suspend_activity IS NOT TRUE) THEN ((man.dispo_max - (count_mandataire_mesures_en_attente(man.*))::integer) - (count_mandataire_mesures_en_cours(man.*))::integer)
            ELSE 0
        END > 0) AS available,
    gcp.latitude,
    gcp.longitude,
    NULL::double precision AS distance
   FROM ((((((mandataires man
     JOIN users u ON ((u.id = man.user_id)))
     LEFT JOIN liste_blanche lb ON ((man.liste_blanche_id = lb.id)))
     LEFT JOIN mandataire_prepose_etablissements lbe ON ((lb.id = lbe.liste_blanche_id)))
     LEFT JOIN etablissements e ON ((e.id = lbe.etablissement_id)))
     LEFT JOIN departements dep ON (((e.departement_code)::text = (dep.id)::text)))
     LEFT JOIN geolocalisation_code_postal gcp ON (((gcp.code_postal)::text = (man.code_postal)::text)))
  WHERE ((u.type)::text = 'prepose'::text)
UNION
 SELECT concat('prepose-', man.id) AS uid,
    mti.ti_id,
    lb.id AS liste_blanche_id,
    NULL::integer AS service_id,
    man.id AS mandataire_id,
    'prepose'::text AS user_type,
    concat(lb.nom, ' ', lb.prenom) AS nom,
    lb.siret,
    lb.code_postal,
    lb.ville,
    concat_ws(' '::text, lb.adresse, lb.adresse_complement) AS adress,
    lb.email,
    NULL::character varying(255) AS departement_code,
        CASE
            WHEN (man.suspend_activity IS NOT TRUE) THEN man.dispo_max
            ELSE 0
        END AS mesures_max,
    (count_mandataire_mesures_en_attente(man.*))::integer AS mesures_awaiting,
    (count_mandataire_mesures_en_cours(man.*))::integer AS mesures_in_progress,
        CASE
            WHEN (man.suspend_activity IS NOT TRUE) THEN ((man.dispo_max - (count_mandataire_mesures_en_attente(man.*))::integer) - (count_mandataire_mesures_en_cours(man.*))::integer)
            ELSE 0
        END AS remaining_capacity,
    true AS prefer,
        CASE
            WHEN (lb.id IS NOT NULL) THEN true
            ELSE false
        END AS habilitation,
    (
        CASE
            WHEN (man.suspend_activity IS NOT TRUE) THEN ((man.dispo_max - (count_mandataire_mesures_en_attente(man.*))::integer) - (count_mandataire_mesures_en_cours(man.*))::integer)
            ELSE 0
        END > 0) AS available,
    gcp.latitude,
    gcp.longitude,
    NULL::double precision AS distance
   FROM ((((mandataires man
     JOIN users u ON ((u.id = man.user_id)))
     LEFT JOIN liste_blanche lb ON ((man.liste_blanche_id = lb.id)))
     JOIN mandataire_tis mti ON ((mti.mandataire_id = man.id)))
     LEFT JOIN geolocalisation_code_postal gcp ON (((gcp.code_postal)::text = (man.code_postal)::text)))
  WHERE ((u.type)::text = 'prepose'::text);
