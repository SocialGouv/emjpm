alter table "public"."mesures" drop constraint "mesures_magistrat_id_foreign",
  add constraint "mesures_magistrat_id_fkey"
  foreign key ("magistrat_id")
  references "public"."magistrat"
  ("id") on update set null on delete set null;
