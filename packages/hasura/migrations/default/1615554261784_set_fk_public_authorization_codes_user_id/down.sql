alter table "public"."authorization_codes" drop constraint "authorization_codes_user_id_fkey",
          add constraint "authorization_codes_user_id_foreign"
          foreign key ("user_id")
          references "public"."users"
          ("id")
          on update no action
          on delete no action;
