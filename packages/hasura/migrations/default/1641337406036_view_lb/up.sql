DROP VIEW "public"."view_lb";
CREATE OR REPLACE VIEW "public"."view_lb" AS
 SELECT concat(lb.type, '-', lb.id) AS uid,
    lb.id AS liste_blanche_id,
    ser.id AS service_id,
    man.id AS mandataire_id,
    lb.type AS user_type,
        CASE
            WHEN (lb.type = 'service'::text) THEN lb.etablissement
            ELSE concat(lb.nom, ' ', lb.prenom)
        END AS nom,
    lb.siret,
    lb.code_postal,
    lb.ville,
    concat_ws(' '::text, lb.adresse, lb.adresse_complement) AS adress,
    lb.email
   FROM (liste_blanche lb
     LEFT JOIN mandataires man ON ((man.liste_blanche_id = lb.id))
     LEFT JOIN services ser ON ((ser.siret = lb.siret))
     );
