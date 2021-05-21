CREATE OR REPLACE FUNCTION public.locate_ti_view_lb_tis(lat double precision, lon double precision)
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
        point,
        distance
    FROM (
        SELECT
            uid,
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
            point,
            (ST_Distance(
                ST_Transform(ST_SetSRID(point::geometry,4326),3857),
                ST_Transform(ST_SetSRID(ST_Point(lon, lat),4326),3857)
            )/1000) as distance
        FROM
            view_lb_tis
        WHERE
            view_lb_tis.point IS NOT NULL
    ) v
$function$;
