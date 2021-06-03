CREATE OR REPLACE FUNCTION public.search_users(search text)
 RETURNS SETOF users
 LANGUAGE sql
 STABLE
AS $function$
    SELECT *
    FROM users
    WHERE
      search IS NULL OR f_unaccent(search) <% f_unaccent(CONCAT_WS(' ', nom, prenom, email, id))
    ORDER BY
      CASE WHEN(search <> id::text) THEN 1 ELSE 2 END DESC,
      similarity(f_unaccent(search), f_unaccent(CONCAT_WS(' ', nom, prenom, email, id))) DESC
$function$;
