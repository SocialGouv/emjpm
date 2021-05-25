-- view_mesure_gestionnaire_departement
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
    ((ser.dispo_max - ser.mesures_awaiting) - ser.mesures_in_progress) AS remaining_capacity
   FROM services ser,
    departements dep
  WHERE dep.id = ser.departement_code
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
    ((man.dispo_max - man.mesures_en_attente) - man.mesures_en_cours) AS remaining_capacity
   FROM mandataires man,
    users u,
    lb_users lbu,
    lb_departements lbd,
    departements dep
  WHERE (((u.type)::text = 'individuel'::text) AND (man.user_id = u.id) AND (man.lb_user_id = lbu.id) AND (man.lb_user_id = lbd.lb_user_id) AND (lbd.departement_code = dep.id))
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
    ((man.dispo_max - man.mesures_en_attente) - man.mesures_en_cours) AS remaining_capacity
   FROM mandataires man,
    users u,
    lb_users lbu,
    lb_user_etablissements lbue,
    etablissements etbl,
    departements dep
  WHERE (((u.type)::text = 'prepose'::text) AND (man.user_id = u.id) AND (man.lb_user_id = lbu.id) AND (man.lb_user_id = lbue.lb_user_id) AND (lbue.etablissement_id = etbl.id) AND (etbl.departement_code = dep.id));

-- view_mesure_gestionnaire

CREATE OR REPLACE VIEW public.view_mesure_gestionnaire AS
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
    ((ser.dispo_max - ser.mesures_awaiting) - ser.mesures_in_progress) AS remaining_capacity
   FROM public.services ser,
    public.departements dep
  WHERE (dep.id = ser.departement_code)
  GROUP BY ser.id, dep.id, dep.nom, ser.dispo_max
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
    ((man.dispo_max - man.mesures_en_attente) - man.mesures_en_cours) AS remaining_capacity
   FROM public.mandataires man,
    public.departements dep,
    public.users u
  WHERE ((dep.id = man.departement_code) AND (man.user_id = u.id));

-- view_department_availability
CREATE VIEW public.view_department_availability AS
 SELECT v.departement_code,
    d.id_region AS region_id,
    sum(v.mesures_awaiting) AS mesures_awaiting,
    sum(v.mesures_in_progress) AS mesures_in_progress,
    sum(v.mesures_max) AS mesures_max
   FROM public.view_mesure_gestionnaire v,
    public.departements d
  WHERE (v.departement_code = d.id)
  GROUP BY v.departement_code, d.id_region;

-- view_indicateur_inscrit

CREATE VIEW public.view_indicateur_inscrit AS
 SELECT d.id,
    d.nom,
    u.type,
    count(m.id) AS count
   FROM public.mandataires m,
    public.users u,
    public.departements d
  WHERE ((m.departement_code = d.id) AND (m.user_id = u.id) AND (u.active = true))
  GROUP BY d.id, d.nom, u.type
UNION
 SELECT d.id,
    d.nom,
    u.type,
    count(DISTINCT sm.service_id) AS count
   FROM public.users u,
    public.departements d,
    public.service_members sm,
    public.services s
  WHERE ((u.active = true) AND (u.id = sm.user_id) AND (sm.service_id = s.id) AND (s.departement_code = d.id))
  GROUP BY d.id, d.nom, u.type
UNION
 SELECT d.id,
    d.nom,
    u.type,
    count(DISTINCT m.id) AS count
   FROM (((public.tis t
     JOIN public.departements d ON ((d.id = t.departement_code)))
     JOIN public.magistrat m ON ((m.ti_id = t.id)))
     JOIN public.users u ON ((u.id = m.user_id)))
  WHERE (u.active = true)
  GROUP BY d.id, d.nom, u.type;

-- view_indicateur_login

CREATE VIEW public.view_indicateur_login AS
 SELECT d.id,
    d.nom,
    u.type,
    count(m.id) AS count
   FROM public.mandataires m,
    public.users u,
    public.departements d
  WHERE ((m.departement_code = d.id) AND (m.user_id = u.id) AND (u.active = true) AND (u.last_login > (now() - '1 mon'::interval)))
  GROUP BY d.id, d.nom, u.type
UNION
 SELECT d.id,
    d.nom,
    u.type,
    count(DISTINCT sm.service_id) AS count
   FROM public.users u,
    public.departements d,
    public.service_members sm,
    public.services s
  WHERE ((u.active = true) AND (u.id = sm.user_id) AND (sm.service_id = s.id) AND (s.departement_code = d.id) AND (u.last_login > (now() - '1 mon'::interval)))
  GROUP BY d.id, d.nom, u.type
UNION
 SELECT d.id,
    d.nom,
    u.type,
    count(DISTINCT m.id) AS count
   FROM (((public.tis t
     JOIN public.departements d ON ((d.id = t.departement_code)))
     JOIN public.magistrat m ON ((m.ti_id = t.id)))
     JOIN public.users u ON ((u.id = m.user_id)))
  WHERE ((u.active = true) AND (u.last_login > (now() - '1 mon'::interval)))
  GROUP BY d.id, d.nom, u.type;
CREATE VIEW public.view_mesure_gestionnaire_tis AS
 SELECT concat(u.type, '-', m.id) AS id,
    NULL::integer AS service_id,
    m.id AS mandataire_id,
        CASE
            WHEN ((u.type)::text = 'individuel'::text) THEN 'MANDATAIRE_IND'::text
            ELSE 'MANDATAIRE_PRE'::text
        END AS discriminator,
    mti.ti_id,
    u.nom AS name
   FROM public.users u,
    public.mandataire_tis mti,
    public.mandataires m
  WHERE ((u.id = m.user_id) AND (m.id = mti.mandataire_id))
UNION
 SELECT concat('service-', sti.service_id) AS id,
    sti.service_id,
    NULL::integer AS mandataire_id,
    'SERVICE'::text AS discriminator,
    sti.ti_id,
    s.etablissement AS name
   FROM public.service_tis sti,
    public.services s
  WHERE (s.id = sti.service_id);

