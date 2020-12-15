
alter table "public"."lb_user_etablissements" drop constraint "lb_user_etablissements_lb_user_id_fkey",
          add constraint "lb_user_etablissements_lb_user_id_foreign"
          foreign key ("lb_user_id")
          references "public"."lb_users"
          ("id")
          on update no action
          on delete no action;

alter table "public"."lb_departements" drop constraint "lb_departements_lb_user_id_fkey",
          add constraint "lb_departements_lb_user_id_foreign"
          foreign key ("lb_user_id")
          references "public"."lb_users"
          ("id")
          on update no action
          on delete no action;


alter table "public"."commentaires" drop constraint "commentaires_mandataire_id_fkey",
          add constraint "commentaires_mandataire_id_foreign"
          foreign key ("mandataire_id")
          references "public"."mandataires"
          ("id")
          on update no action
          on delete no action;

alter table "public"."mesures" drop constraint "mesures_mandataire_id_fkey",
          add constraint "mesures_mandataire_id_foreign"
          foreign key ("mandataire_id")
          references "public"."mandataires"
          ("id")
          on update no action
          on delete no action;

alter table "public"."mandataires" drop constraint "mandataires_lb_user_id_fkey",
          add constraint "mandataires_lb_user_id_foreign"
          foreign key ("lb_user_id")
          references "public"."lb_users"
          ("id")
          on update no action
          on delete no action;
