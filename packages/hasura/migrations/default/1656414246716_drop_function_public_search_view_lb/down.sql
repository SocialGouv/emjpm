CREATE OR REPLACE FUNCTION public.search_view_lb(search text)
 RETURNS SETOF view_lb
 LANGUAGE sql
 STABLE
AS $function$
    SELECT *
    FROM view_lb
    WHERE
      search IS NULL OR f_unaccent(search) <% f_unaccent(CONCAT_WS(' ', siret, nom, code_postal, ville, adress, email))
    ORDER BY
      similarity(f_unaccent(search), f_unaccent(CONCAT_WS(' ', siret, nom, code_postal, ville, adress, email))) DESC
$function$;
