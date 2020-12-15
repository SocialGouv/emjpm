

alter table "public"."mandataires" drop constraint "mandataires_lb_user_id_foreign",
             add constraint "mandataires_lb_user_id_fkey"
             foreign key ("lb_user_id")
             references "public"."lb_users"
             ("id") on update cascade on delete cascade;

alter table "public"."mesures" drop constraint "mesures_mandataire_id_foreign",
             add constraint "mesures_mandataire_id_fkey"
             foreign key ("mandataire_id")
             references "public"."mandataires"
             ("id") on update cascade on delete cascade;

alter table "public"."commentaires" drop constraint "commentaires_mandataire_id_foreign",
             add constraint "commentaires_mandataire_id_fkey"
             foreign key ("mandataire_id")
             references "public"."mandataires"
             ("id") on update cascade on delete cascade;

alter table "public"."lb_departements" drop constraint "lb_departements_lb_user_id_foreign",
             add constraint "lb_departements_lb_user_id_fkey"
             foreign key ("lb_user_id")
             references "public"."lb_users"
             ("id") on update cascade on delete cascade;

alter table "public"."lb_user_etablissements" drop constraint "lb_user_etablissements_lb_user_id_foreign",
             add constraint "lb_user_etablissements_lb_user_id_fkey"
             foreign key ("lb_user_id")
             references "public"."lb_users"
             ("id") on update cascade on delete cascade;
