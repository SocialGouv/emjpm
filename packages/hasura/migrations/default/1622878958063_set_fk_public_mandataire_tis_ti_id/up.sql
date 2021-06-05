alter table "public"."mandataire_tis" drop constraint "mandataire_tis_ti_id_foreign",
  add constraint "mandataire_tis_ti_id_fkey"
  foreign key ("ti_id")
  references "public"."tis"
  ("id") on update cascade on delete cascade;
