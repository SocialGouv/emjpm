CREATE OR REPLACE VIEW "public"."view_indicateur_login" AS 
 SELECT d.id,
    d.nom,
    u.type,
    count(m.id) AS count
   FROM mandataires m,
    users u,
    departements d
  WHERE (((m.departement_code)::text = (d.id)::text) AND (m.user_id = u.id) AND (u.active = true) AND (u.last_login > (now() - '1 mon'::interval)))
  GROUP BY d.id, d.nom, u.type
UNION
 SELECT d.id,
    d.nom,
    u.type,
    count(DISTINCT sm.service_id) AS count
   FROM users u,
    departements d,
    service_members sm,
    services s
  WHERE ((u.active = true) AND (u.id = sm.user_id) AND (sm.service_id = s.id) AND ((s.departement_code)::text = (d.id)::text) AND (u.last_login > (now() - '1 mon'::interval)))
  GROUP BY d.id, d.nom, u.type
UNION
 SELECT d.id,
    d.nom,
    u.type,
    count(DISTINCT m.id) AS count
   FROM (((tis t
     JOIN departements d ON (((d.id)::text = (t.departement_code)::text)))
     JOIN magistrat m ON ((m.ti_id = t.id)))
     JOIN users u ON ((u.id = m.user_id)))
  WHERE ((u.active = true) AND (u.last_login > (now() - '1 mon'::interval)))
  GROUP BY d.id, d.nom, u.type
UNION
 SELECT d.id,
    d.nom,
    u.type,
    count(DISTINCT di.id) AS count
   FROM direction di
     JOIN departements d ON d.id = di.departement_code
     JOIN users u ON di.user_id = u.id
  WHERE di.type = 'departemental' AND ((u.active = true) AND (u.last_login > (now() - '1 mon'::interval)))
  GROUP BY d.id, d.nom, u.type
UNION
 SELECT d.id,
    d.nom,
    u.type,
    count(DISTINCT di.id) AS count
   FROM direction di
     JOIN regions r ON r.id = di.region_id
     JOIN departements d ON d.id_region = r.id
     JOIN users u ON di.user_id = u.id
  WHERE di.type = 'regional' AND ((u.active = true) AND (u.last_login > (now() - '1 mon'::interval)))
  GROUP BY d.id, d.nom, u.type;
