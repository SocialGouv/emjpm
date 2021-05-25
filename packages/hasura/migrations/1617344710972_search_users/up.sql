CREATE FUNCTION search_users(search text)
RETURNS SETOF users AS $$
    SELECT *
    FROM users
    WHERE
      search <% (nom || ' ' || prenom || ' ' || email || ' ' || id)
    ORDER BY
      similarity(search, (nom || ' ' || prenom || ' ' || email || ' ' || id)) DESC
$$ LANGUAGE sql STABLE;
