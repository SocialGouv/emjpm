alter table "public"."authorization_codes" drop constraint "authorization_codes_user_id_foreign",
             add constraint "authorization_codes_user_id_fkey"
             foreign key ("user_id")
             references "public"."users"
             ("id") on update cascade on delete cascade;
