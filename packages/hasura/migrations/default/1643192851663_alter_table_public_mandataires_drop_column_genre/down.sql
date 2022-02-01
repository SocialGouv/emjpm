alter table "public"."mandataires" alter column "genre" drop not null;
alter table "public"."mandataires" add column "genre" varchar;
