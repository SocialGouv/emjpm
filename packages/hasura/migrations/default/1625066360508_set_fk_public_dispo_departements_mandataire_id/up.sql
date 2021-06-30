alter table "public"."dispo_departements"
  add constraint "dispo_departements_mandataire_id_fkey"
  foreign key ("mandataire_id")
  references "public"."mandataires"
  ("id") on update cascade on delete cascade;
