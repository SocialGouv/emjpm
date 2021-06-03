CREATE OR REPLACE FUNCTION public.search_ti_view_lb_tis(search text, departementcode text, tiid integer)
 RETURNS SETOF view_lb_tis
 LANGUAGE sql
 STABLE
AS $function$
    SELECT
        DISTINCT ON(uid) uid,
        ti_id,
        lb_user_id,
        service_id,
        mandataire_id,
        user_type,
        nom,
        siret,
        code_postal,
        ville,
        adress,
        email,
        departement_code,
        mesures_max,
        mesures_awaiting,
        mesures_in_progress,
        remaining_capacity,
        prefer,
        habilitation,
        available,
        latitude,
        longitude,
        distance
    FROM (
        SELECT
            *
        FROM
            view_lb_tis vlt
        WHERE
            (
                vlt.departement_code = departementCode
                OR vlt.ti_id = tiId
            )
            AND search IS NULL OR search <% CONCAT_WS(' ', siret, nom, code_postal, ville, adress, email)
        ORDER BY
            similarity(search, CONCAT_WS(' ', siret, nom, code_postal, ville, adress, email)) DESC
    
    ) v
$function$;
