alter table "public"."service_tis" drop constraint "service_tis_service_id_foreign",
             add constraint "service_tis_service_id_fkey"
             foreign key ("service_id")
             references "public"."services"
             ("id") on update cascade on delete cascade;
