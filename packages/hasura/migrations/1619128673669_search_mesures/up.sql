CREATE OR REPLACE FUNCTION public.search_mesures(search text)
 RETURNS SETOF mesures
 LANGUAGE sql
 STABLE
AS $function$
    SELECT *
    FROM mesures
    WHERE
      search IS NULL OR search <% CONCAT_WS(' ', code_postal, ville, annee_naissance, numero_dossier, numero_rg)
    ORDER BY
      CASE WHEN(search = numero_rg) THEN 0 ELSE 1 END DESC,
      CASE WHEN(search LIKE numero_rg) THEN 0 ELSE 1 END DESC,
      similarity(search, CONCAT_WS(' ', code_postal, ville, annee_naissance, numero_dossier, numero_rg)) DESC
$function$
