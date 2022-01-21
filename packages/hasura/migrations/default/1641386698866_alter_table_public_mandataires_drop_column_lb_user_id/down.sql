alter table "public"."mandataires" add constraint "mandataires_lb_user_id_unique" unique (lb_user_id);
alter table "public"."mandataires"
  add constraint "mandataires_lb_user_id_fkey"
  foreign key (lb_user_id)
  references "public"."lb_users"
  (id) on update cascade on delete cascade;
alter table "public"."mandataires" alter column "lb_user_id" drop not null;
alter table "public"."mandataires" add column "lb_user_id" int4;
