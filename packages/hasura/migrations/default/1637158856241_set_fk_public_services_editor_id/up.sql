alter table "public"."services"
  add constraint "services_editor_id_fkey"
  foreign key ("editor_id")
  references "public"."editors"
  ("id") on update set null on delete set null;
