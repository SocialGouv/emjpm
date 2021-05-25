CREATE OR REPLACE FUNCTION search_services(search text)
RETURNS SETOF services AS $$
    SELECT *
    FROM services
    WHERE
      search IS NULL OR search <% (etablissement || ' ' || siret || ' ' || code_postal || ' ' || ville || ' ' || adresse || ' ' || nom || ' ' || prenom || ' ' || email || ' ' || id)
    ORDER BY
      similarity(search, (etablissement || ' ' || siret || ' ' || code_postal || ' ' || ville || ' ' || adresse || ' ' || nom || ' ' || prenom || ' ' || email || ' ' || id)) DESC
$$ LANGUAGE sql STABLE;
