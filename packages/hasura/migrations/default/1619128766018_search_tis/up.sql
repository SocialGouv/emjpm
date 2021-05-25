CREATE OR REPLACE FUNCTION public.search_tis(search text)
 RETURNS SETOF tis
 LANGUAGE sql
 STABLE
AS $function$
    SELECT *
    FROM tis
    WHERE
      search IS NULL OR search <% CONCAT_WS(' ', etablissement, siret, code_postal, ville, adresse, email, departement_code)
    ORDER BY
      similarity(search, CONCAT_WS(' ', etablissement, siret, code_postal, ville, adresse, email, departement_code)) DESC
$function$;
