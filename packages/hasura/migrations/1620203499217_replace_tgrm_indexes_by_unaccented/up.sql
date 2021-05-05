DROP INDEX search_etablissements_gin_idx;
CREATE INDEX search_etablissements_gin_idx ON etablissements
USING GIN (f_unaccent(nofinesset || ' ' || rslongue || ' ' || complrs || ' ' || compldistrib || ' ' || voie || ' ' || ligneacheminement) gin_trgm_ops);

DROP INDEX search_users_gin_idx;
CREATE INDEX search_users_gin_idx ON users
USING GIN (f_unaccent(nom || ' ' || prenom || ' ' || email || ' ' || id) gin_trgm_ops);

DROP INDEX search_services_gin_idx;
CREATE INDEX search_services_gin_idx ON services
USING GIN (f_unaccent(etablissement || ' ' || siret || ' ' || code_postal || ' ' || ville || ' ' || adresse || ' ' || nom || ' ' || prenom || ' ' || email || ' ' || id) gin_trgm_ops);

DROP INDEX search_tis_gin_idx;
CREATE INDEX search_tis_gin_idx ON tis
USING GIN (f_unaccent(etablissement::text || ' ' || siret::text || ' ' || code_postal::text || ' ' || ville::text || ' ' || adresse::text || ' ' || email::text || ' ' || departement_code::text) gin_trgm_ops);

DROP INDEX search_lb_users_gin_idx;
CREATE INDEX search_lb_users_gin_idx ON lb_users
USING GIN ((siret::text || ' ' || nom::text  || ' '|| prenom::text || ' ' || code_postal::text || ' ' || ville::text || ' ' || adresse1::text || ' '|| adresse2::text || ' ' || email::text) gin_trgm_ops);

DROP INDEX search_mesures_gin_idx;
CREATE INDEX search_mesures_gin_idx ON mesures
USING GIN ((code_postal::text || ' ' || ville::text || ' ' || annee_naissance::text || ' '|| numero_dossier::text || ' ' || numero_rg::text) gin_trgm_ops);

DROP INDEX search_mandataires_gin_idx;
CREATE INDEX search_mandataires_gin_idx ON mandataires
USING GIN ((adresse::text || ' ' || code_postal::text || ' ' || ville::text || ' ' || telephone::text || ' '|| telephone_portable::text || ' ' || competences::text || ' ' || siret::text) gin_trgm_ops);
