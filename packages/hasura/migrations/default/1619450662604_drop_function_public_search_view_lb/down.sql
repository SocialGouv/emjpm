CREATE OR REPLACE FUNCTION public.search_view_lb(search text)
 RETURNS SETOF view_lb
 LANGUAGE sql
 STABLE
AS $function$
    SELECT *
    FROM view_lb
    WHERE
      search IS NULL OR search <% CONCAT_WS(' ', siret, nom, code_postal, ville, adress, email)
    ORDER BY
      similarity(search, CONCAT_WS(' ', siret, nom, code_postal, ville, adress, email)) DESC
$function$;
