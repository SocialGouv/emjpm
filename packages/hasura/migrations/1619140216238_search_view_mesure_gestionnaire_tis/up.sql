CREATE OR REPLACE FUNCTION public.search_view_mesure_gestionnaire_tis(search text)
 RETURNS SETOF view_mesure_gestionnaire_tis
 LANGUAGE sql
 STABLE
AS $function$
    SELECT *
    FROM view_mesure_gestionnaire_tis
    WHERE
      search IS NULL OR search <% CONCAT_WS(' ', nom, siret, code_postal, ville, adresse, telephones, email)
    ORDER BY
      CASE WHEN(search = nom) THEN 0 ELSE 1 END DESC,
      CASE WHEN(search LIKE nom) THEN 0 ELSE 1 END DESC,
      similarity(search, nom) DESC,
      similarity(search, CONCAT_WS(' ', nom, siret, code_postal, ville, adresse, telephones, email)) DESC
$function$;
