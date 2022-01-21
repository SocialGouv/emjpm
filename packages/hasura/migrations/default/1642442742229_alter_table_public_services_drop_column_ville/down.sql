alter table "public"."services" alter column "ville" drop not null;
alter table "public"."services" add column "ville" varchar;
