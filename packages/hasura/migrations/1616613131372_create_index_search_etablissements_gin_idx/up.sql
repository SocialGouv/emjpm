CREATE INDEX search_etablissements_gin_idx ON etablissements
USING GIN ((nofinesset || ' ' || rslongue || ' ' || complrs || ' ' || compldistrib || ' ' || voie || ' ' || ligneacheminement) gin_trgm_ops);
