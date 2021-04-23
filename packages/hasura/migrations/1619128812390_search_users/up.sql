CREATE OR REPLACE FUNCTION public.search_users(search text)
 RETURNS SETOF users
 LANGUAGE sql
 STABLE
AS $function$
    SELECT *
    FROM users
    WHERE
      search IS NULL OR search <% CONCAT_WS(' ', nom, prenom, email, id)
    ORDER BY
      CASE WHEN(search <> id::text) THEN 0 ELSE 1 END DESC,
      similarity(search, CONCAT_WS(' ', nom, prenom, email, id)) DESC
$function$;
