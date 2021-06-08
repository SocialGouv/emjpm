CREATE OR REPLACE VIEW "public"."view_mesure_gestionnaire_departement" AS 
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
   FROM (((services ser
     JOIN service_departements sdep ON sdep.service_id = ser.id
     JOIN departements dep ON (((dep.id)::text = (sdep.departement_code)::text)))
     JOIN service_members serm ON ((serm.service_id = ser.id)))
     JOIN users u ON ((serm.user_id = u.id)))
  WHERE (u.active = true)
  GROUP BY ser.id, dep.id
UNION
 SELECT concat(u.type, '-', man.id) AS id,
    NULL::integer AS service_id,
    man.id AS mandataire_id,
    'MANDATAIRE_IND'::text AS discriminator,
    concat(u.nom, ' ', u.prenom) AS nom,
    dep.id AS departement_code,
    dep.nom AS dep_nom,
    man.dispo_max AS mesures_max,
    man.mesures_en_attente AS mesures_awaiting,
    man.mesures_en_cours AS mesures_in_progress,
    ((man.dispo_max - man.mesures_en_attente) - man.mesures_en_cours) AS remaining_capacity,
    man.mesures_last_update
   FROM ((((mandataires man
     JOIN users u ON ((((u.type)::text = 'individuel'::text) AND (man.user_id = u.id))))
     JOIN lb_users lbu ON ((man.lb_user_id = lbu.id)))
     JOIN lb_departements lbd ON ((man.lb_user_id = lbd.lb_user_id)))
     JOIN departements dep ON (((lbd.departement_code)::text = (dep.id)::text)))
  WHERE (u.active = true)
UNION
 SELECT concat(u.type, '-', man.id) AS id,
    NULL::integer AS service_id,
    man.id AS mandataire_id,
    'MANDATAIRE_PRE'::text AS discriminator,
    concat(u.nom, ' ', u.prenom) AS nom,
    dep.id AS departement_code,
    dep.nom AS dep_nom,
    man.dispo_max AS mesures_max,
    man.mesures_en_attente AS mesures_awaiting,
    man.mesures_en_cours AS mesures_in_progress,
    ((man.dispo_max - man.mesures_en_attente) - man.mesures_en_cours) AS remaining_capacity,
    man.mesures_last_update
   FROM (((((mandataires man
     JOIN users u ON ((((u.type)::text = 'prepose'::text) AND (man.user_id = u.id))))
     JOIN lb_users lbu ON ((man.lb_user_id = lbu.id)))
     JOIN lb_user_etablissements lbue ON ((man.lb_user_id = lbue.lb_user_id)))
     JOIN etablissements etbl ON ((lbue.etablissement_id = etbl.id)))
     JOIN departements dep ON (((etbl.departement_code)::text = (dep.id)::text)))
  WHERE (u.active = true);
