CREATE OR REPLACE FUNCTION public.search_services(search text)
 RETURNS SETOF services
 LANGUAGE sql
 STABLE
AS $function$
    SELECT *
    FROM services
    WHERE
      search IS NULL OR search <% CONCAT_WS(' ', siret, code_postal, ville, adresse, nom, prenom, email, id)
    ORDER BY
      similarity(search, CONCAT_WS(' ', siret, code_postal, ville, adresse, nom, prenom, email, id)) DESC
$function$;
