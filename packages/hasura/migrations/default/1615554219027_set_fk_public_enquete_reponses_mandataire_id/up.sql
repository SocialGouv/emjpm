alter table "public"."enquete_reponses" drop constraint "enquete_reponses_mandataire_id_foreign",
             add constraint "enquete_reponses_mandataire_id_fkey"
             foreign key ("mandataire_id")
             references "public"."mandataires"
             ("id") on update cascade on delete cascade;
