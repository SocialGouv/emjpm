CREATE INDEX search_mandataires_gin_idx ON mandataires
USING GIN ((adresse::text || ' ' || code_postal::text || ' ' || ville::text || ' ' || telephone::text || ' '|| telephone_portable::text || ' ' || competences::text || ' ' || siret::text) gin_trgm_ops);
