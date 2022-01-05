alter table "public"."mandataire_individuel_departements"
  add constraint "lb_departements_lb_user_id_fkey"
  foreign key (lb_user_id)
  references "public"."lb_users"
  (id) on update cascade on delete cascade;
alter table "public"."mandataire_individuel_departements" alter column "lb_user_id" drop not null;
alter table "public"."mandataire_individuel_departements" add column "lb_user_id" int4;
