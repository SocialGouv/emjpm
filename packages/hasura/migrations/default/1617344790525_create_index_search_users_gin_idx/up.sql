CREATE INDEX search_users_gin_idx ON users
USING GIN ((nom || ' ' || prenom || ' ' || email || ' ' || id) gin_trgm_ops);
