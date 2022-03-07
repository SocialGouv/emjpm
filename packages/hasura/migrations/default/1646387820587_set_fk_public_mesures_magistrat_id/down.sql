alter table "public"."mesures" drop constraint "mesures_magistrat_id_fkey",
  add constraint "mesures_magistrat_id_foreign"
  foreign key ("magistrat_id")
  references "public"."magistrat"
  ("id") on update no action on delete no action;
