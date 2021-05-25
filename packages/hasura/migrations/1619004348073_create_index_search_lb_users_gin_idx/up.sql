CREATE INDEX search_lb_users_gin_idx ON lb_users
USING GIN ((siret::text || ' ' || nom::text  || ' '|| prenom::text || ' ' || code_postal::text || ' ' || ville::text || ' ' || adresse1::text || ' '|| adresse2::text || ' ' || email::text) gin_trgm_ops);
