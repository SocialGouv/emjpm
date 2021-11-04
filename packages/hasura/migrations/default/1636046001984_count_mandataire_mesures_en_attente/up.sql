CREATE OR REPLACE FUNCTION public.count_mandataire_mesures_en_attente(mandataire_row mandataires)
 RETURNS bigint
 LANGUAGE sql
 STABLE
AS $function$
  SELECT
    CASE WHEN mandataire_row.mesures_en_attente_cached IS NOT NULL
        THEN mandataire_row.mesures_en_attente_cached
        ELSE (SELECT COUNT(*) FROM mesures WHERE mandataire_id=mandataire_row.id AND status = 'en_attente')
    END
$function$;
