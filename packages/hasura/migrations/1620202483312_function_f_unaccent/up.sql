CREATE EXTENSION unaccent;

CREATE OR REPLACE FUNCTION public.immutable_unaccent(regdictionary, text)
  RETURNS text LANGUAGE c IMMUTABLE PARALLEL SAFE STRICT AS
'$libdir/unaccent', 'unaccent_dict';

CREATE OR REPLACE FUNCTION public.f_unaccent(text)
  RETURNS text LANGUAGE sql IMMUTABLE PARALLEL SAFE STRICT AS
$func$
SELECT public.immutable_unaccent(regdictionary 'public.unaccent', $1)
$func$;
