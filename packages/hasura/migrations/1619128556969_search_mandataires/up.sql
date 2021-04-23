CREATE OR REPLACE FUNCTION public.search_mandataires(search text)
 RETURNS SETOF mandataires
 LANGUAGE sql
 STABLE
AS $function$
    SELECT *
    FROM mandataires
    WHERE
      search IS NULL OR search <% CONCAT_WS(' ', adresse, code_postal, ville, telephone, telephone_portable, competences, siret)
    ORDER BY
      similarity(search, CONCAT_WS(' ', adresse, code_postal, ville, telephone, telephone_portable, competences, siret)) DESC
$function$;
