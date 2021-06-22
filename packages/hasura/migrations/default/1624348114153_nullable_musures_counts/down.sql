alter table "public"."mandataires" alter column "mesures_en_cours" set not null;
alter table "public"."mandataires" alter column "mesures_en_attente" set not null;
alter table "public"."service_antenne" alter column "mesures_in_progress" set not null;
alter table "public"."service_antenne" alter column "mesures_awaiting" set not null;
