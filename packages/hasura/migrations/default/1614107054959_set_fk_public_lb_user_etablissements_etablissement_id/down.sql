alter table "public"."lb_user_etablissements" drop constraint "lb_user_etablissements_etablissement_id_fkey",
          add constraint "lb_user_etablissements_etablissement_id_foreign"
          foreign key ("etablissement_id")
          references "public"."etablissements"
          ("id")
          on update no action
          on delete no action;
