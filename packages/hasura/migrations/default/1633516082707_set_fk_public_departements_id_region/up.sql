alter table "public"."departements" drop constraint "departements_id_region_foreign",
  add constraint "departements_id_region_fkey"
  foreign key ("id_region")
  references "public"."regions"
  ("id") on update cascade on delete cascade;
