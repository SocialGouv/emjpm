alter table "public"."lb_user_etablissements" drop constraint "lb_user_etablissements_etablissement_id_foreign",
             add constraint "lb_user_etablissements_etablissement_id_fkey"
             foreign key ("etablissement_id")
             references "public"."etablissements"
             ("id") on update cascade on delete cascade;
