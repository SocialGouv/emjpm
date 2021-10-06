alter table "public"."departements" drop constraint "departements_id_region_fkey",
  add constraint "departements_id_region_foreign"
  foreign key ("id_region")
  references "public"."regions"
  ("id") on update no action on delete no action;
