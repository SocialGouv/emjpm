CREATE INDEX geolocalisation_code_postal_point_idx ON public.geolocalisation_code_postal USING GIST (point);
