alter table "public"."authorization_codes" drop constraint "authorization_codes_client_id_foreign",
             add constraint "authorization_codes_client_id_fkey"
             foreign key ("client_id")
             references "public"."editors"
             ("id") on update cascade on delete cascade;
