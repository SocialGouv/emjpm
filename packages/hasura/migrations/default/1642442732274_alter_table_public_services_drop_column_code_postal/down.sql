alter table "public"."services" alter column "code_postal" drop not null;
alter table "public"."services" add column "code_postal" varchar;
