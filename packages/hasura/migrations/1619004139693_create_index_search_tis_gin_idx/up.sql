CREATE INDEX search_tis_gin_idx ON tis
USING GIN ((etablissement::text || ' ' || siret::text || ' ' || code_postal::text || ' ' || ville::text || ' ' || adresse::text || ' ' || email::text || ' ' || departement_code::text) gin_trgm_ops);
