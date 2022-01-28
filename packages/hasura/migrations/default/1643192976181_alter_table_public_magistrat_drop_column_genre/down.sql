alter table "public"."magistrat" alter column "genre" drop not null;
alter table "public"."magistrat" add column "genre" text;
