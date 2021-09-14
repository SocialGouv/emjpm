alter table "public"."mesures"
  add constraint "mesures_etablissement_id_fkey"
  foreign key (etablissement_id)
  references "public"."etablissements"
  (id) on update set null on delete set null;
alter table "public"."mesures" alter column "etablissement_id" drop not null;
alter table "public"."mesures" add column "etablissement_id" int4;
