alter table "public"."service_tis" drop constraint "service_tis_ti_id_fkey",
          add constraint "service_tis_ti_id_foreign"
          foreign key ("ti_id")
          references "public"."tis"
          ("id")
          on update no action
          on delete no action;
