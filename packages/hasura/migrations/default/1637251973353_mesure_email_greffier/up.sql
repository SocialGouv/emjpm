CREATE OR REPLACE FUNCTION public.mesure_email_greffier(mesure_row mesures)
 RETURNS text
 LANGUAGE sql
 STABLE
AS $function$
  SELECT users.email FROM users, greffier WHERE greffier.id = mesure_row.greffier_id AND users.id = greffier.user_id AND greffier.share_email IS TRUE
$function$;
