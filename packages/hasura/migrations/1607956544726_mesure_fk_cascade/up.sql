
alter table "public"."mesure_ressources" drop constraint "mesure_ressources_mesure_id_foreign",
             add constraint "mesure_ressources_mesure_id_fkey"
             foreign key ("mesure_id")
             references "public"."mesures"
             ("id") on update cascade on delete cascade;

alter table "public"."mesure_etat" drop constraint "mesure_etat_mesure_id_foreign",
             add constraint "mesure_etat_mesure_id_fkey"
             foreign key ("mesure_id")
             references "public"."mesures"
             ("id") on update cascade on delete cascade;
