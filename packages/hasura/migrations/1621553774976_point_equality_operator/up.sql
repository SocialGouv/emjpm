CREATE OR REPLACE FUNCTION public.hashpoint(point) RETURNS integer
   LANGUAGE sql IMMUTABLE
   AS 'SELECT hashfloat8($1[0]) # hashfloat8($1[1])';

CREATE OPERATOR CLASS public.point_hash_ops DEFAULT FOR TYPE point USING hash AS
   OPERATOR 1 ~=(point,point),
   FUNCTION 1 public.hashpoint(point);
