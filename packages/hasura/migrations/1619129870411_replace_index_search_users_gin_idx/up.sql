DROP INDEX search_users_gin_idx;
CREATE INDEX search_users_gin_idx ON users
USING GIN ((nom::text || ' ' || prenom::text || ' ' || email::text || ' ' || id::text) gin_trgm_ops);
