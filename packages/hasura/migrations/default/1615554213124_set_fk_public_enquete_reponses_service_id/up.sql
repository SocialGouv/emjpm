alter table "public"."enquete_reponses" drop constraint "enquete_reponses_service_id_foreign",
             add constraint "enquete_reponses_service_id_fkey"
             foreign key ("service_id")
             references "public"."services"
             ("id") on update cascade on delete cascade;
