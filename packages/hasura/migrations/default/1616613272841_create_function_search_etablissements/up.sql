CREATE FUNCTION search_etablissements(search text)
RETURNS SETOF etablissements AS $$
    SELECT *
    FROM etablissements
    WHERE
      search <% (nofinesset || ' ' || rslongue || ' ' || complrs || ' ' || compldistrib || ' ' || voie || ' ' || ligneacheminement)
    ORDER BY
      similarity(search, (nofinesset || ' ' || rslongue || ' ' || complrs || ' ' || compldistrib || ' ' || voie || ' ' || ligneacheminement)) DESC
$$ LANGUAGE sql STABLE;
