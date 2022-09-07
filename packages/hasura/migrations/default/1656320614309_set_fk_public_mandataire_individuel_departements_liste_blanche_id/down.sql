alter table "public"."mandataire_individuel_departements" drop constraint "mandataire_individuel_departements_liste_blanche_id_fkey",
  add constraint "mandataire_individuel_departement_liste_blanche_id_fkey"
  foreign key ("liste_blanche_id")
  references "public"."liste_blanche"
  ("id") on update cascade on delete cascade;
