alter table "public"."enquete_reponses" drop constraint "enquete_reponses_mandataire_id_fkey",
          add constraint "enquete_reponses_mandataire_id_foreign"
          foreign key ("mandataire_id")
          references "public"."mandataires"
          ("id")
          on update no action
          on delete no action;
