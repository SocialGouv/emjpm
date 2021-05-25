CREATE INDEX search_services_gin_idx ON services
USING GIN ((etablissement || ' ' || siret || ' ' || code_postal || ' ' || ville || ' ' || adresse || ' ' || nom || ' ' || prenom || ' ' || email || ' ' || id) gin_trgm_ops);
