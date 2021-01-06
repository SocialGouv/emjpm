CREATE OR REPLACE VIEW "public"."view_mesure_gestionnaire_departement" AS
 SELECT concat('service-', ser.id) AS id,
    ser.id AS service_id,
    NULL::integer AS mandataire_id,
    'SERVICE'::text AS discriminator,
    ser.etablissement AS nom,
    dep.id AS department_id,
    dep.nom AS dep_nom,
    ser.dispo_max AS mesures_max,
    ser.mesures_awaiting,
    ser.mesures_in_progress,
    ((ser.dispo_max - ser.mesures_awaiting) - ser.mesures_in_progress) AS remaining_capacity
   FROM services ser,
    departements dep
  WHERE dep.id = ser.department_id
UNION
 SELECT concat(u.type, '-', man.id) AS id,
    NULL::integer AS service_id,
    man.id AS mandataire_id,
    'MANDATAIRE_IND'::text AS discriminator,
    concat(u.nom, ' ', u.prenom) AS nom,
    dep.id AS department_id,
    dep.nom AS dep_nom,
    man.dispo_max AS mesures_max,
    man.mesures_en_attente AS mesures_awaiting,
    man.mesures_en_cours AS mesures_in_progress,
    ((man.dispo_max - man.mesures_en_attente) - man.mesures_en_cours) AS remaining_capacity
   FROM mandataires man,
    users u,
    lb_users lbu,
    lb_departements lbd,
    departements dep
  WHERE (((u.type)::text = 'individuel'::text) AND (man.user_id = u.id) AND (man.lb_user_id = lbu.id) AND (man.lb_user_id = lbd.lb_user_id) AND (lbd.departement_id = dep.id))
UNION
 SELECT concat(u.type, '-', man.id) AS id,
    NULL::integer AS service_id,
    man.id AS mandataire_id,
    'MANDATAIRE_PRE'::text AS discriminator,
    concat(u.nom, ' ', u.prenom) AS nom,
    dep.id AS department_id,
    dep.nom AS dep_nom,
    man.dispo_max AS mesures_max,
    man.mesures_en_attente AS mesures_awaiting,
    man.mesures_en_cours AS mesures_in_progress,
    ((man.dispo_max - man.mesures_en_attente) - man.mesures_en_cours) AS remaining_capacity
   FROM mandataires man,
    users u,
    lb_users lbu,
    lb_user_etablissements lbue,
    etablissements etbl,
    departements dep
  WHERE (((u.type)::text = 'prepose'::text) AND (man.user_id = u.id) AND (man.lb_user_id = lbu.id) AND (man.lb_user_id = lbue.lb_user_id) AND (lbue.etablissement_id = etbl.id) AND (etbl.departement_id = dep.id));
