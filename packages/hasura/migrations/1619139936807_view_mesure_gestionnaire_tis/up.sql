CREATE OR REPLACE VIEW "public"."view_mesure_gestionnaire_tis" AS 
 SELECT concat(u.type, '-', m.id) AS id,
    NULL::integer AS service_id,
    m.id AS mandataire_id,
        CASE
            WHEN ((u.type)::text = 'individuel'::text) THEN 'MANDATAIRE_IND'::text
            ELSE 'MANDATAIRE_PRE'::text
        END AS discriminator,
    mti.ti_id,
    u.nom AS name,
    CONCAT(u.nom, ' ', u.prenom) AS nom,
    m.siret AS siret,
    m.code_postal AS code_postal,
    m.ville AS ville,
    m.adresse AS adresse,
    CONCAT_WS(' ', m.telephone, m.telephone_portable) AS telephones,
    u.email AS email
   FROM users u,
    mandataire_tis mti,
    mandataires m
  WHERE ((u.id = m.user_id) AND (m.id = mti.mandataire_id))
UNION
 SELECT concat('service-', sti.service_id) AS id,
    sti.service_id,
    NULL::integer AS mandataire_id,
    'SERVICE'::text AS discriminator,
    sti.ti_id,
    s.etablissement AS name,
    s.etablissement AS nom,
    s.siret AS siret,
    s.code_postal AS code_postal,
    s.ville AS ville,
    s.adresse AS adresse,
    s.telephone AS telephones,
    s.email AS email
   FROM service_tis sti,
    services s
  WHERE (s.id = sti.service_id);
