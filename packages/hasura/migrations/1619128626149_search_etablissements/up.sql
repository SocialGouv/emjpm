CREATE OR REPLACE FUNCTION public.search_etablissements(search text)
 RETURNS SETOF etablissements
 LANGUAGE sql
 STABLE
AS $function$
    SELECT *
    FROM etablissements
    WHERE
      search IS NULL OR search <% CONCAT_WS(' ', nofinesset, rslongue, complrs, compldistrib, voie, ligneacheminement)
    ORDER BY
      similarity(search, CONCAT_WS(' ', nofinesset, rslongue, complrs, compldistrib, voie, ligneacheminement)) DESC
$function$;
