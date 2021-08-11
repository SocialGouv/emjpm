


alter table "public"."mesure_en_attente_reouverture" drop constraint "mesure_en_attente_reouverture_civilite_fkey";

alter table "public"."mesure_en_attente_reouverture" alter column "ti_id" set not null;

alter table "public"."mesure_en_attente_reouverture" alter column "service_id" set not null;

alter table "public"."mesure_en_attente_reouverture" alter column "mandataire_id" set not null;

alter table "public"."mesure_en_attente_reouverture" alter column "magistrat_id" set not null;

alter table "public"."mesure_en_attente_reouverture" alter column "judgment_date" set not null;

alter table "public"."mesure_en_attente_reouverture" alter column "civilite" set not null;

alter table "public"."mesure_en_attente_reouverture" alter column "champ_mesure" set not null;

alter table "public"."mesure_en_attente_reouverture" alter column "annee_naissance" set not null;

alter table "public"."mesure_en_attente_reouverture" alter column "cabinet" set not null;

DROP TABLE "public"."mesure_en_attente_reouverture";
