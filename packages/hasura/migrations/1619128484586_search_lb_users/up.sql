CREATE OR REPLACE FUNCTION public.search_lb_users(search text)
 RETURNS SETOF lb_users
 LANGUAGE sql
 STABLE
AS $function$
    SELECT *
    FROM lb_users
    WHERE
      search IS NULL OR search <% CONCAT_WS(' ', siret, nom, prenom, code_postal, ville, adresse1, adresse2, email)
    ORDER BY
      similarity(search, CONCAT_WS(' ', siret, nom, prenom, code_postal, ville, adresse1, adresse2, email)) DESC
$function$;
