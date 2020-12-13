
alter table "public"."service_members" drop constraint "service_members_user_id_fkey",
          add constraint "service_admin_user_id_foreign"
          foreign key ("user_id")
          references "public"."users"
          ("id")
          on update no action
          on delete no action;

alter table "public"."mandataires" drop constraint "mandataires_user_id_fkey",
          add constraint "mandataires_user_id_foreign"
          foreign key ("user_id")
          references "public"."users"
          ("id")
          on update no action
          on delete no action;

alter table "public"."mandataire_tis" drop constraint "mandataire_tis_mandataire_id_fkey",
          add constraint "mandataire_tis_mandataire_id_foreign"
          foreign key ("mandataire_id")
          references "public"."mandataires"
          ("id")
          on update no action
          on delete no action;

alter table "public"."magistrat" drop constraint "magistrat_user_id_fkey",
          add constraint "magistrat_user_id_foreign"
          foreign key ("user_id")
          references "public"."users"
          ("id")
          on update no action
          on delete no action;

alter table "public"."direction" drop constraint "direction_user_id_fkey",
          add constraint "direction_user_id_foreign"
          foreign key ("user_id")
          references "public"."users"
          ("id")
          on update no action
          on delete no action;

alter table "public"."user_role" drop constraint "user_role_user_id_fkey",
          add constraint "user_role_user_id_foreign"
          foreign key ("user_id")
          references "public"."users"
          ("id")
          on update no action
          on delete no action;
