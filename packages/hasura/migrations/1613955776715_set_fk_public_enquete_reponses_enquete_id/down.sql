alter table "public"."enquete_reponses" drop constraint "enquete_reponses_enquete_id_fkey",
          add constraint "enquete_reponses_enquete_id_foreign"
          foreign key ("enquete_id")
          references "public"."enquetes"
          ("id")
          on update no action
          on delete no action;
