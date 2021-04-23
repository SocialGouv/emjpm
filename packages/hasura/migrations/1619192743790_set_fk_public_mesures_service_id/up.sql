alter table "public"."mesures" drop constraint "mesures_service_id_foreign",
             add constraint "mesures_service_id_fkey"
             foreign key ("service_id")
             references "public"."services"
             ("id") on update cascade on delete cascade;
