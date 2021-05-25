alter table "public"."service_tis" drop constraint "service_tis_service_id_fkey",
          add constraint "service_tis_service_id_foreign"
          foreign key ("service_id")
          references "public"."services"
          ("id")
          on update no action
          on delete no action;
