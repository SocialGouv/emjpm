alter table "public"."authorization_codes" drop constraint "authorization_codes_client_id_fkey",
          add constraint "authorization_codes_client_id_foreign"
          foreign key ("client_id")
          references "public"."editors"
          ("id")
          on update no action
          on delete no action;
