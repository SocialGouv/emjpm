CREATE INDEX search_mesures_gin_idx ON mesures
USING GIN ((code_postal::text || ' ' || ville::text || ' ' || annee_naissance::text || ' '|| numero_dossier::text || ' ' || numero_rg::text) gin_trgm_ops);
