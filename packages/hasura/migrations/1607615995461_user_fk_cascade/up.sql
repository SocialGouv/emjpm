
alter table "public"."user_role" drop constraint "user_role_user_id_foreign",
             add constraint "user_role_user_id_fkey"
             foreign key ("user_id")
             references "public"."users"
             ("id") on update cascade on delete cascade;

alter table "public"."direction" drop constraint "direction_user_id_foreign",
             add constraint "direction_user_id_fkey"
             foreign key ("user_id")
             references "public"."users"
             ("id") on update cascade on delete cascade;

alter table "public"."magistrat" drop constraint "magistrat_user_id_foreign",
             add constraint "magistrat_user_id_fkey"
             foreign key ("user_id")
             references "public"."users"
             ("id") on update cascade on delete cascade;

alter table "public"."mandataire_tis" drop constraint "mandataire_tis_mandataire_id_foreign",
             add constraint "mandataire_tis_mandataire_id_fkey"
             foreign key ("mandataire_id")
             references "public"."mandataires"
             ("id") on update cascade on delete cascade;

alter table "public"."mandataires" drop constraint "mandataires_user_id_foreign",
             add constraint "mandataires_user_id_fkey"
             foreign key ("user_id")
             references "public"."users"
             ("id") on update cascade on delete cascade;

alter table "public"."service_members" drop constraint "service_admin_user_id_foreign",
             add constraint "service_members_user_id_fkey"
             foreign key ("user_id")
             references "public"."users"
             ("id") on update cascade on delete cascade;
