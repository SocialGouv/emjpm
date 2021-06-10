alter table "public"."services"
  add constraint "services_departement_code_fkey"
  foreign key (departement_code)
  references "public"."departements"
  (id) on update no action on delete no action;
alter table "public"."services" alter column "departement_code" drop not null;
alter table "public"."services" add column "departement_code" varchar;
