CREATE OR REPLACE FUNCTION public.mesure_email_magistrat(mesure_row mesures)
 RETURNS text
 LANGUAGE sql
 STABLE
AS $function$
  SELECT users.email FROM users, magistrat WHERE magistrat.id = mesure_row.magistrat_id AND users.id = magistrat.user_id AND magistrat.share_email IS TRUE
$function$;
