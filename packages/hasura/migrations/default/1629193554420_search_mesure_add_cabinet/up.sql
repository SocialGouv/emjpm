CREATE OR REPLACE FUNCTION public.search_mesures(search text)
 RETURNS SETOF mesures
 LANGUAGE sql
 STABLE
AS $function$
    SELECT *
    FROM mesures
    WHERE
      search IS NULL OR f_unaccent(search) <% f_unaccent(CONCAT_WS(' ', code_postal, ville, annee_naissance, numero_dossier, numero_rg, cabinet))
    ORDER BY
      CASE WHEN(search = numero_rg) THEN 0 ELSE 1 END DESC,
      CASE WHEN(search LIKE numero_rg) THEN 0 ELSE 1 END DESC,
      similarity(f_unaccent(search), f_unaccent(CONCAT_WS(' ', code_postal, ville, annee_naissance, numero_dossier, numero_rg, cabinet))) DESC
$function$;
