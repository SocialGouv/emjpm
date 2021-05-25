CREATE OR REPLACE FUNCTION search_users(search text)
RETURNS SETOF users AS $$
    SELECT *
    FROM users
    WHERE
      search IS NULL OR search <% (nom || ' ' || prenom || ' ' || email || ' ' || id)
    ORDER BY
      similarity(search, (nom || ' ' || prenom || ' ' || email || ' ' || id)) DESC
$$ LANGUAGE sql STABLE;
