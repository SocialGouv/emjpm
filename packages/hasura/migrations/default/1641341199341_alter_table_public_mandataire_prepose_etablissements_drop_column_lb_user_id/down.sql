alter table "public"."mandataire_prepose_etablissements"
  add constraint "lb_user_etablissements_lb_user_id_fkey"
  foreign key (lb_user_id)
  references "public"."lb_users"
  (id) on update cascade on delete cascade;
alter table "public"."mandataire_prepose_etablissements" alter column "lb_user_id" drop not null;
alter table "public"."mandataire_prepose_etablissements" add column "lb_user_id" int4;
