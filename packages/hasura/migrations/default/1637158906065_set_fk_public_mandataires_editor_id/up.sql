alter table "public"."mandataires"
  add constraint "mandataires_editor_id_fkey"
  foreign key ("editor_id")
  references "public"."editors"
  ("id") on update set null on delete set null;
