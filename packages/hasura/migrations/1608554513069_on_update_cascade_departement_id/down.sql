
alter table "public"."tis" drop constraint "tis_departement_id_fkey",
          add constraint "tis_departement_id_foreign"
          foreign key ("departement_id")
          references "public"."departements"
          ("id")
          on update no action
          on delete no action;

alter table "public"."services" drop constraint "services_department_id_fkey",
          add constraint "services_department_id_foreign"
          foreign key ("department_id")
          references "public"."departements"
          ("id")
          on update no action
          on delete no action;

alter table "public"."mesures" drop constraint "mesures_department_id_fkey",
          add constraint "mesures_department_id_foreign"
          foreign key ("department_id")
          references "public"."departements"
          ("id")
          on update no action
          on delete no action;

alter table "public"."mandataires" drop constraint "mandataires_department_id_fkey",
          add constraint "mandataires_department_id_foreign"
          foreign key ("department_id")
          references "public"."departements"
          ("id")
          on update no action
          on delete no action;

alter table "public"."lb_departements" drop constraint "lb_departements_departement_id_fkey",
          add constraint "lb_departements_departement_id_foreign"
          foreign key ("departement_id")
          references "public"."departements"
          ("id")
          on update no action
          on delete no action;

alter table "public"."etablissements" drop constraint "etablissements_departement_id_fkey",
          add constraint "etablissements_departement_id_foreign"
          foreign key ("departement_id")
          references "public"."departements"
          ("id")
          on update no action
          on delete no action;

alter table "public"."enquete_reponses" drop constraint "enquete_reponses_departement_id_fkey",
          add constraint "enquete_reponses_departement_id_foreign"
          foreign key ("departement_id")
          references "public"."departements"
          ("id")
          on update no action
          on delete no action;

alter table "public"."direction" drop constraint "direction_department_id_fkey",
          add constraint "direction_department_id_foreign"
          foreign key ("department_id")
          references "public"."departements"
          ("id")
          on update no action
          on delete no action;
