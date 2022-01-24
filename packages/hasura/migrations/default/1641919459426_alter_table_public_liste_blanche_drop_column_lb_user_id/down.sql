alter table "public"."liste_blanche" alter column "lb_user_id" drop not null;
alter table "public"."liste_blanche" add column "lb_user_id" int4;
