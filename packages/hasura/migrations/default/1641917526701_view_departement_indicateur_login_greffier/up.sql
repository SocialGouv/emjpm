CREATE OR REPLACE VIEW "public"."view_departement_indicateur_login" AS 
 SELECT d.id,
    d.nom,
    u.type,
    count(m.id) AS count
   FROM ((((mandataires m
     JOIN users u ON ((m.user_id = u.id)))
     JOIN liste_blanche lb ON ((m.liste_blanche_id = lb.id)))
     JOIN mandataire_individuel_departements lbd ON ((m.liste_blanche_id = lbd.liste_blanche_id)))
     JOIN departements d ON (((lbd.departement_code)::text = (d.id)::text)))
  WHERE ((u.active = true) AND (u.last_login > (now() - '1 mon'::interval)))
  GROUP BY d.id, d.nom, u.type
UNION
 SELECT d.id,
    d.nom,
    u.type,
    count(DISTINCT sm.service_id) AS count
   FROM ((((users u
     JOIN service_members sm ON ((u.id = sm.user_id)))
     JOIN services s ON ((sm.service_id = s.id)))
     JOIN service_departements sdep ON ((sdep.service_id = s.id)))
     JOIN departements d ON ((sdep.departement_code = (d.id)::text)))
  WHERE ((u.active = true) AND (u.last_login > (now() - '1 mon'::interval)))
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
    count(DISTINCT g.id) AS count
   FROM (((tis t
     JOIN departements d ON (((d.id)::text = (t.departement_code)::text)))
     JOIN greffier g ON ((g.ti_id = t.id)))
     JOIN users u ON ((u.id = g.user_id)))
  WHERE ((u.active = true) AND (u.last_login > (now() - '1 mon'::interval)))
  GROUP BY d.id, d.nom, u.type
UNION
 SELECT d.id,
    d.nom,
    u.type,
    count(DISTINCT di.id) AS count
   FROM ((direction di
     JOIN departements d ON (((d.id)::text = (di.departement_code)::text)))
     JOIN users u ON ((di.user_id = u.id)))
  WHERE (((di.type)::text = 'departemental'::text) AND ((u.active = true) AND (u.last_login > (now() - '1 mon'::interval))))
  GROUP BY d.id, d.nom, u.type
UNION
 SELECT d.id,
    d.nom,
    u.type,
    count(DISTINCT di.id) AS count
   FROM (((direction di
     JOIN regions r ON ((r.id = di.region_id)))
     JOIN departements d ON ((d.id_region = r.id)))
     JOIN users u ON ((di.user_id = u.id)))
  WHERE (((di.type)::text = 'regional'::text) AND ((u.active = true) AND (u.last_login > (now() - '1 mon'::interval))))
  GROUP BY d.id, d.nom, u.type;
