CREATE OR REPLACE FUNCTION public.count_service_mesures_in_progress(service_row services)
 RETURNS bigint
 LANGUAGE sql
 STABLE
AS $function$
  SELECT
    CASE WHEN service_row.mesures_in_progress_cached IS NOT NULL
        THEN service_row.mesures_in_progress_cached
        ELSE (SELECT COUNT(*) FROM mesures WHERE service_id=service_row.id AND status = 'en_cours')
    END
$function$;
