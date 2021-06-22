alter table "public"."mandataires" alter column "mesures_en_cours" drop not null;
alter table "public"."mandataires" alter column "mesures_last_update" drop not null;
alter table "public"."service_antenne" alter column "mesures_in_progress" drop not null;
alter table "public"."service_antenne" alter column "mesures_awaiting" drop not null;
