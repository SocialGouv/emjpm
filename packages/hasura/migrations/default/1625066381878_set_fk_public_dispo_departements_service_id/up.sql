alter table "public"."dispo_departements"
  add constraint "dispo_departements_service_id_fkey"
  foreign key ("service_id")
  references "public"."services"
  ("id") on update cascade on delete cascade;
