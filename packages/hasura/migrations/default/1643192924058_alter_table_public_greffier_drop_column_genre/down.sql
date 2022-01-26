alter table "public"."greffier" alter column "genre" drop not null;
alter table "public"."greffier" add column "genre" text;
