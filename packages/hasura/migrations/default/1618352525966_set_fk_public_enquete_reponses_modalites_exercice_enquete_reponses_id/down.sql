alter table "public"."enquete_reponses_modalites_exercice" drop constraint "enquete_reponses_modalites_exercice_enquete_reponses_id_fkey",
          add constraint "enquete_reponses_modalites_exercice_enquete_reponses_id_fkey"
          foreign key ("enquete_reponses_id")
          references "public"."enquete_reponses"
          ("id")
          on update cascade
          on delete restrict;
