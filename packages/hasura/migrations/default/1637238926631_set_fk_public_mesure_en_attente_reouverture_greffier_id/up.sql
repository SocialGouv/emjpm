alter table "public"."mesure_en_attente_reouverture"
  add constraint "mesure_en_attente_reouverture_greffier_id_fkey"
  foreign key ("greffier_id")
  references "public"."greffier"
  ("id") on update set null on delete set null;
