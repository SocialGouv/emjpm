CREATE OR REPLACE VIEW "public"."view_mesure_gestionnaire_region" AS 
 SELECT concat('service-', ser.id) AS id,
    ser.id AS service_id,
    NULL::integer AS mandataire_id,
    'SERVICE'::text AS discriminator,
    ser.etablissement AS nom,
    reg.id AS id_region,
    ser.dispo_max AS mesures_max,
    ser.mesures_awaiting_cached AS mesures_awaiting,
    ser.mesures_in_progress_cached AS mesures_in_progress,
        CASE
            WHEN (ser.suspend_activity IS NOT TRUE) THEN ((ser.dispo_max - (count_service_mesures_awaiting(ser.*))::integer) - (count_service_mesures_in_progress(ser.*))::integer)
            ELSE 0
        END AS remaining_capacity,
    ser.mesures_last_update,
    ser.suspend_activity
   FROM (((((services ser
     JOIN service_departements sdep ON ((sdep.service_id = ser.id)))
     JOIN departements dep ON (((dep.id)::text = sdep.departement_code)))
     JOIN regions reg ON ((reg.id = dep.id_region)))
     JOIN service_members serm ON ((serm.service_id = ser.id)))
     JOIN users u ON ((serm.user_id = u.id)))
  WHERE (u.active = true)
  GROUP BY ser.id, reg.id
UNION
 SELECT concat(u.type, '-', man.id) AS id,
    NULL::integer AS service_id,
    man.id AS mandataire_id,
    'MANDATAIRE_IND'::text AS discriminator,
    concat(u.nom, ' ', u.prenom) AS nom,
    reg.id AS id_region,
    man.dispo_max AS mesures_max,
    man.mesures_en_attente_cached AS mesures_awaiting,
    man.mesures_en_cours_cached AS mesures_in_progress,
        CASE
            WHEN (man.suspend_activity IS NOT TRUE) THEN ((man.dispo_max - (count_mandataire_mesures_en_attente(man.*))::integer) - (count_mandataire_mesures_en_cours(man.*))::integer)
            ELSE 0
        END AS remaining_capacity,
    man.mesures_last_update,
    man.suspend_activity
   FROM (((((mandataires man
     JOIN users u ON ((((u.type)::text = 'individuel'::text) AND (man.user_id = u.id))))
     JOIN liste_blanche lb ON ((man.liste_blanche_id = lb.id)))
     JOIN mandataire_individuel_departements lbd ON ((man.liste_blanche_id = lbd.liste_blanche_id)))
     JOIN departements dep ON (((lbd.departement_code)::text = (dep.id)::text)))
     JOIN regions reg ON ((reg.id = dep.id_region)))
  WHERE (u.active = true)
UNION
 SELECT concat(u.type, '-', man.id) AS id,
    NULL::integer AS service_id,
    man.id AS mandataire_id,
    'MANDATAIRE_PRE'::text AS discriminator,
    concat(u.nom, ' ', u.prenom) AS nom,
    reg.id AS id_region,
    man.dispo_max AS mesures_max,
    man.mesures_en_attente_cached AS mesures_awaiting,
    man.mesures_en_cours_cached AS mesures_in_progress,
        CASE
            WHEN (man.suspend_activity IS NOT TRUE) THEN ((man.dispo_max - (count_mandataire_mesures_en_attente(man.*))::integer) - (count_mandataire_mesures_en_cours(man.*))::integer)
            ELSE 0
        END AS remaining_capacity,
    man.mesures_last_update,
    man.suspend_activity
   FROM ((((((mandataires man
     JOIN users u ON ((((u.type)::text = 'prepose'::text) AND (man.user_id = u.id))))
     JOIN liste_blanche lb ON ((man.liste_blanche_id = lb.id)))
     JOIN mandataire_prepose_etablissements lbe ON ((man.liste_blanche_id = lbe.liste_blanche_id)))
     JOIN etablissements etbl ON ((lbe.etablissement_id = etbl.id)))
     JOIN departements dep ON (((etbl.departement_code)::text = (dep.id)::text)))
     JOIN regions reg ON ((reg.id = dep.id_region)))
  WHERE (u.active = true);
