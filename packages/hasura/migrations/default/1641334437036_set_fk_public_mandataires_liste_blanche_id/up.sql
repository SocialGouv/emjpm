alter table "public"."mandataires"
  add constraint "mandataires_liste_blanche_id_fkey"
  foreign key ("liste_blanche_id")
  references "public"."liste_blanche"
  ("id") on update cascade on delete cascade;
