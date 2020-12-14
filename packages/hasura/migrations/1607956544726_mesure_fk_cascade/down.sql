
alter table "public"."mesure_etat" drop constraint "mesure_etat_mesure_id_fkey",
          add constraint "mesure_etat_mesure_id_foreign"
          foreign key ("mesure_id")
          references "public"."mesures"
          ("id")
          on update no action
          on delete no action;

alter table "public"."mesure_ressources" drop constraint "mesure_ressources_mesure_id_fkey",
          add constraint "mesure_ressources_mesure_id_foreign"
          foreign key ("mesure_id")
          references "public"."mesures"
          ("id")
          on update no action
          on delete no action;
