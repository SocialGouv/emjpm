alter table "public"."service_tis" drop constraint "service_tis_ti_id_foreign",
             add constraint "service_tis_ti_id_fkey"
             foreign key ("ti_id")
             references "public"."tis"
             ("id") on update cascade on delete cascade;
