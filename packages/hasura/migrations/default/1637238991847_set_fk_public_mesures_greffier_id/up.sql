alter table "public"."mesures"
  add constraint "mesures_greffier_id_fkey"
  foreign key ("greffier_id")
  references "public"."greffier"
  ("id") on update set null on delete set null;
