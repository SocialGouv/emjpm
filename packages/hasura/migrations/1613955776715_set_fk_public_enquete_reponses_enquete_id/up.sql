alter table "public"."enquete_reponses" drop constraint "enquete_reponses_enquete_id_foreign",
             add constraint "enquete_reponses_enquete_id_fkey"
             foreign key ("enquete_id")
             references "public"."enquetes"
             ("id") on update cascade on delete cascade;
