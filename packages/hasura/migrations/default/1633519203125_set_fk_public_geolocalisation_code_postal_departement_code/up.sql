alter table "public"."geolocalisation_code_postal"
  add constraint "geolocalisation_code_postal_departement_code_fkey"
  foreign key ("departement_code")
  references "public"."departements"
  ("id") on update restrict on delete restrict;
