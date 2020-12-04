
alter table "public"."mesures" drop constraint "mesures_civilite_fkey";

ALTER TABLE "public"."mesures" ALTER COLUMN "civilite" TYPE USER-DEFINED;

alter table "public"."mesures" drop constraint "mesures_status_fkey";

DROP TABLE "public"."mesure_status";

DROP TABLE "public"."civilite";


alter table "public"."resultat_revision_mesure" rename to "resultat_revision";

alter table "public"."mesures" drop constraint "mesures_cause_sortie_fkey";

alter table "public"."cause_sortie_mesure" rename to "cause_sortie";

DROP TABLE "public"."cause_sortie";

alter table "public"."mesures" drop constraint "mesures_resultat_revision_fkey";

DROP TABLE "public"."resultat_revision";

ALTER TABLE "public"."mesures" ALTER COLUMN "resultat_revision" TYPE USER-DEFINED;


alter table "public"."mesures" drop constraint "mesures_type_etablissement_fkey";

alter table "public"."mesures" drop constraint "mesures_nature_mesure_fkey";

alter table "public"."mesures" drop constraint "mesures_lieu_vie_fkey";

ALTER TABLE "public"."mesures" ALTER COLUMN "lieu_vie" TYPE USER-DEFINED;

alter table "public"."mesures" drop constraint "mesures_champ_mesure_fkey";

ALTER TABLE "public"."mesures" ALTER COLUMN "nature_mesure" TYPE USER-DEFINED;

ALTER TABLE "public"."mesures" ALTER COLUMN "status" TYPE USER-DEFINED;

ALTER TABLE "public"."mesures" ALTER COLUMN "cause_sortie" TYPE USER-DEFINED;

ALTER TABLE "public"."mesures" ALTER COLUMN "champ_mesure" TYPE USER-DEFINED;

ALTER TABLE "public"."mesures" ALTER COLUMN "type_etablissement" TYPE USER-DEFINED;

alter table "public"."mesure_etat" drop constraint "mesure_etat_type_etablissement_fkey";

alter table "public"."mesure_etat" drop constraint "mesure_etat_lieu_vie_fkey";

DROP TABLE "public"."type_etablissement";

DROP TABLE "public"."lieu_vie_majeur";

ALTER TABLE "public"."mesure_etat" ALTER COLUMN "type_etablissement" TYPE USER-DEFINED;

ALTER TABLE "public"."mesure_etat" ALTER COLUMN "lieu_vie" TYPE USER-DEFINED;

alter table "public"."mesure_etat" drop constraint "mesure_etat_nature_mesure_fkey";

ALTER TABLE "public"."mesure_etat" ALTER COLUMN "nature_mesure" TYPE USER-DEFINED;

DROP TABLE "public"."nature_mesure";

alter table "public"."mesure_etat" drop constraint "mesure_etat_champ_mesure_fkey";

ALTER TABLE "public"."mesure_etat" ALTER COLUMN "champ_mesure" TYPE USER-DEFINED;

DROP TABLE "public"."champ_mesure";
