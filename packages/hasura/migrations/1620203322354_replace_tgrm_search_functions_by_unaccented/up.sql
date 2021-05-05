CREATE OR REPLACE FUNCTION public.search_lb_users(search text)
 RETURNS SETOF lb_users
 LANGUAGE sql
 STABLE
AS $function$
    SELECT *
    FROM lb_users
    WHERE
      search IS NULL OR f_unaccent(search) <% f_unaccent(CONCAT_WS(' ', siret, nom, prenom, code_postal, ville, adresse1, adresse2, email))
    ORDER BY
      similarity(f_unaccent(search), f_unaccent(CONCAT_WS(' ', siret, nom, prenom, code_postal, ville, adresse1, adresse2, email))) DESC
$function$;

CREATE OR REPLACE FUNCTION public.search_etablissements(search text)
 RETURNS SETOF etablissements
 LANGUAGE sql
 STABLE
AS $function$
    SELECT *
    FROM etablissements
    WHERE
      search IS NULL OR f_unaccent(search) <% f_unaccent(CONCAT_WS(' ', nofinesset, rslongue, complrs, compldistrib, voie, ligneacheminement))
    ORDER BY
      similarity(f_unaccent(search), f_unaccent(CONCAT_WS(' ', nofinesset, rslongue, complrs, compldistrib, voie, ligneacheminement))) DESC
$function$;


CREATE OR REPLACE FUNCTION public.search_etablissements(search text)
 RETURNS SETOF etablissements
 LANGUAGE sql
 STABLE
AS $function$
    SELECT *
    FROM etablissements
    WHERE
      search IS NULL OR f_unaccent(search) <% f_unaccent(CONCAT_WS(' ', nofinesset, rslongue, complrs, compldistrib, voie, ligneacheminement))
    ORDER BY
      similarity(f_unaccent(search), f_unaccent(CONCAT_WS(' ', nofinesset, rslongue, complrs, compldistrib, voie, ligneacheminement))) DESC
$function$;

CREATE OR REPLACE FUNCTION public.search_mandataires(search text)
 RETURNS SETOF mandataires
 LANGUAGE sql
 STABLE
AS $function$
    SELECT *
    FROM mandataires
    WHERE
      search IS NULL OR f_unaccent(search) <% f_unaccent(CONCAT_WS(' ', adresse, code_postal, ville, telephone, telephone_portable, competences, siret))
    ORDER BY
      similarity(f_unaccent(search), f_unaccent(CONCAT_WS(' ', adresse, code_postal, ville, telephone, telephone_portable, competences, siret))) DESC
$function$;

CREATE OR REPLACE FUNCTION public.search_mesures(search text)
 RETURNS SETOF mesures
 LANGUAGE sql
 STABLE
AS $function$
    SELECT *
    FROM mesures
    WHERE
      search IS NULL OR f_unaccent(search) <% f_unaccent(CONCAT_WS(' ', code_postal, ville, annee_naissance, numero_dossier, numero_rg))
    ORDER BY
      CASE WHEN(search = numero_rg) THEN 0 ELSE 1 END DESC,
      CASE WHEN(search LIKE numero_rg) THEN 0 ELSE 1 END DESC,
      similarity(f_unaccent(search), f_unaccent(CONCAT_WS(' ', code_postal, ville, annee_naissance, numero_dossier, numero_rg))) DESC
$function$;


CREATE OR REPLACE FUNCTION public.search_services(search text)
 RETURNS SETOF services
 LANGUAGE sql
 STABLE
AS $function$
    SELECT *
    FROM services
    WHERE
      search IS NULL OR f_unaccent(search) <% f_unaccent(CONCAT_WS(' ', etablissement, siret, code_postal, ville, adresse, nom, prenom, email, id))
    ORDER BY
      similarity(f_unaccent(search), f_unaccent(CONCAT_WS(' ', etablissement, siret, code_postal, ville, adresse, nom, prenom, email, id))) DESC
$function$;


CREATE OR REPLACE FUNCTION public.search_tis(search text)
 RETURNS SETOF tis
 LANGUAGE sql
 STABLE
AS $function$
    SELECT *
    FROM tis
    WHERE
      search IS NULL OR f_unaccent(search) <% f_unaccent(CONCAT_WS(' ', etablissement, siret, code_postal, ville, adresse, email, departement_code))
    ORDER BY
      similarity(f_unaccent(search), f_unaccent(CONCAT_WS(' ', etablissement, siret, code_postal, ville, adresse, email, departement_code))) DESC
$function$;


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
      CASE WHEN(search <> id::text) THEN 1 ELSE 2 END,
      similarity(f_unaccent(search), f_unaccent(CONCAT_WS(' ', nom, prenom, email, id))) DESC
$function$;


CREATE OR REPLACE FUNCTION public.search_view_lb(search text)
 RETURNS SETOF view_lb
 LANGUAGE sql
 STABLE
AS $function$
    SELECT *
    FROM view_lb
    WHERE
      search IS NULL OR f_unaccent(search) <% f_unaccent(CONCAT_WS(' ', siret, nom, code_postal, ville, adress, email))
    ORDER BY
      similarity(f_unaccent(search), f_unaccent(CONCAT_WS(' ', siret, nom, code_postal, ville, adress, email))) DESC
$function$;

CREATE OR REPLACE FUNCTION public.search_view_mesure_gestionnaire_tis(search text)
 RETURNS SETOF view_mesure_gestionnaire_tis
 LANGUAGE sql
 STABLE
AS $function$
    SELECT *
    FROM view_mesure_gestionnaire_tis
    WHERE
      search IS NULL OR f_unaccent(search) <% f_unaccent(CONCAT_WS(' ', nom, siret, code_postal, ville, adresse, telephones, email))
    ORDER BY
      CASE WHEN(f_unaccent(search) = f_unaccent(nom)) THEN 0 ELSE 1 END DESC,
      CASE WHEN(f_unaccent(search) ILIKE f_unaccent(nom)) THEN 0 ELSE 1 END DESC,
      similarity(f_unaccent(search), f_unaccent(nom)) DESC,
      similarity(f_unaccent(search), f_unaccent(CONCAT_WS(' ', nom, siret, code_postal, ville, adresse, telephones, email))) DESC
$function$;
