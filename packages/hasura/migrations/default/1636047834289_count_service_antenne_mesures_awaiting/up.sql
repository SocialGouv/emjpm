CREATE OR REPLACE FUNCTION public.count_service_antenne_mesures_awaiting(service_antenne_row service_antenne)
 RETURNS bigint
 LANGUAGE sql
 STABLE
AS $function$
  SELECT
    CASE WHEN service_antenne_row.mesures_awaiting_cached IS NOT NULL
        THEN service_antenne_row.mesures_awaiting_cached
        ELSE (SELECT COUNT(*) FROM mesures WHERE antenne_id=service_antenne_row.id AND status = 'en_attente')
    END
$function$;
