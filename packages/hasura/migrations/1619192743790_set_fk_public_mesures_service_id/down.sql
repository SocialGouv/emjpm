alter table "public"."mesures" drop constraint "mesures_service_id_fkey",
          add constraint "mesures_service_id_foreign"
          foreign key ("service_id")
          references "public"."services"
          ("id")
          on update no action
          on delete no action;
