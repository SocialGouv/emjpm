alter table "public"."regions" alter column "id" set default nextval('regions_id_seq'::regclass);
