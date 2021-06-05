alter table "public"."mandataire_tis" drop constraint "mandataire_tis_ti_id_fkey",
  add constraint "mandataire_tis_ti_id_foreign"
  foreign key ("ti_id")
  references "public"."tis"
  ("id") on update no action on delete no action;
