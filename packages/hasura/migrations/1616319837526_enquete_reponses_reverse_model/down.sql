
ALTER TABLE "public"."enquete_reponses" ADD COLUMN "departement_id" int4;
ALTER TABLE "public"."enquete_reponses" ALTER COLUMN "departement_id" DROP NOT NULL;

ALTER TABLE "public"."enquete_reponses_service_personnel_formation" ALTER COLUMN "enquete_reponses_id" SET NOT NULL;

ALTER TABLE "public"."enquete_reponses_service_informations" ALTER COLUMN "enquete_reponses_id" SET NOT NULL;

ALTER TABLE "public"."enquete_reponses_prestations_sociales" ALTER COLUMN "enquete_reponses_id" SET NOT NULL;

ALTER TABLE "public"."enquete_reponses_prepose_prestations_sociales" ALTER COLUMN "enquete_reponses_id" SET NOT NULL;

ALTER TABLE "public"."enquete_reponses_prepose_personel_formation" ALTER COLUMN "enquete_reponses_id" SET NOT NULL;

ALTER TABLE "public"."enquete_reponses_populations" ALTER COLUMN "enquete_reponses_id" SET NOT NULL;

ALTER TABLE "public"."enquete_reponses_modalites_exercice" ALTER COLUMN "enquete_reponses_id" SET NOT NULL;

ALTER TABLE "public"."enquete_reponses_informations_mandataire" ALTER COLUMN "enquete_reponses_id" TYPE integer;
ALTER TABLE "public"."enquete_reponses_informations_mandataire" ALTER COLUMN "enquete_reponses_id" SET NOT NULL;

ALTER TABLE "public"."enquete_reponses_financement" ALTER COLUMN "enquete_reponses_id" SET NOT NULL;

ALTER TABLE "public"."enquete_reponses_agrements_formations" ALTER COLUMN "enquete_reponses_id" SET NOT NULL;

ALTER TABLE "public"."enquete_reponses_activite" ALTER COLUMN "enquete_reponses_id" SET NOT NULL;

alter table "public"."enquete_reponses" drop constraint "enquete_reponses_enquete_id_service_id_key";

alter table "public"."enquete_reponses" drop constraint "enquete_reponses_enquete_id_mandataire_id_key";

ALTER TABLE "public"."enquete_reponses_service_personnel_formation" DROP CONSTRAINT "enquete_reponses_service_personnel_formation_enquete_reponses_id_key";

ALTER TABLE "public"."enquete_reponses_service_informations" DROP CONSTRAINT "enquete_reponses_service_informations_enquete_reponses_id_key";

ALTER TABLE "public"."enquete_reponses_prestations_sociales" DROP CONSTRAINT "enquete_reponses_prestations_sociales_enquete_reponses_id_key";

ALTER TABLE "public"."enquete_reponses_prepose_prestations_sociales" DROP CONSTRAINT "enquete_reponses_prepose_prestations_sociales_enquete_reponses_id_key";

ALTER TABLE "public"."enquete_reponses_prepose_personel_formation" DROP CONSTRAINT "enquete_reponses_prepose_personel_formation_enquete_reponses_id_key";

ALTER TABLE "public"."enquete_reponses_populations" DROP CONSTRAINT "enquete_reponses_populations_enquete_reponses_id_key";

ALTER TABLE "public"."enquete_reponses_modalites_exercice" DROP CONSTRAINT "enquete_reponses_modalites_exercice_enquete_reponses_id_key";

ALTER TABLE "public"."enquete_reponses_informations_mandataire" DROP CONSTRAINT "enquete_reponses_informations_mandataire_enquete_reponses_id_key";

ALTER TABLE "public"."enquete_reponses_financement" DROP CONSTRAINT "enquete_reponses_financement_enquete_reponses_id_key";

ALTER TABLE "public"."enquete_reponses_agrements_formations" DROP CONSTRAINT "enquete_reponses_agrements_formations_enquete_reponses_id_key";

ALTER TABLE "public"."enquete_reponses_activite" DROP CONSTRAINT "enquete_reponses_activite_enquete_reponses_id_key";

ALTER TABLE "public"."enquete_reponses" ADD COLUMN "enquete_reponses_service_informations_id" int4;
ALTER TABLE "public"."enquete_reponses" ALTER COLUMN "enquete_reponses_service_informations_id" DROP NOT NULL;
ALTER TABLE "public"."enquete_reponses" ADD CONSTRAINT enquete_reponses_enquete_reponses_service_informations_id_forei FOREIGN KEY (enquete_reponses_service_informations_id) REFERENCES "public"."enquete_reponses_service_informations" (id) ON DELETE no action ON UPDATE no action;

ALTER TABLE "public"."enquete_reponses" ADD COLUMN "enquete_reponses_service_personnel_formation_id" int4;
ALTER TABLE "public"."enquete_reponses" ALTER COLUMN "enquete_reponses_service_personnel_formation_id" DROP NOT NULL;
ALTER TABLE "public"."enquete_reponses" ADD CONSTRAINT enquete_reponses_enquete_service_personnel_formation_id_foreign FOREIGN KEY (enquete_reponses_service_personnel_formation_id) REFERENCES "public"."enquete_reponses_service_personnel_formation" (id) ON DELETE no action ON UPDATE no action;

ALTER TABLE "public"."enquete_reponses" ADD COLUMN "enquete_reponses_activite_id" int4;
ALTER TABLE "public"."enquete_reponses" ALTER COLUMN "enquete_reponses_activite_id" DROP NOT NULL;
ALTER TABLE "public"."enquete_reponses" ADD CONSTRAINT enquete_reponses_enquete_reponses_activite_id_foreign FOREIGN KEY (enquete_reponses_activite_id) REFERENCES "public"."enquete_reponses_activite" (id) ON DELETE no action ON UPDATE no action;

ALTER TABLE "public"."enquete_reponses" ADD COLUMN "enquete_reponses_prepose_prestations_sociales_id" int4;
ALTER TABLE "public"."enquete_reponses" ALTER COLUMN "enquete_reponses_prepose_prestations_sociales_id" DROP NOT NULL;
ALTER TABLE "public"."enquete_reponses" ADD CONSTRAINT enquete_reponses_enquete_reponses_prepose_prestations_sociales_ FOREIGN KEY (enquete_reponses_prepose_prestations_sociales_id) REFERENCES "public"."enquete_reponses_prepose_prestations_sociales" (id) ON DELETE no action ON UPDATE no action;

ALTER TABLE "public"."enquete_reponses" ADD COLUMN "enquete_reponses_financement_id" int4;
ALTER TABLE "public"."enquete_reponses" ALTER COLUMN "enquete_reponses_financement_id" DROP NOT NULL;
ALTER TABLE "public"."enquete_reponses" ADD CONSTRAINT enquete_reponses_enquete_reponses_financement_id_foreign FOREIGN KEY (enquete_reponses_financement_id) REFERENCES "public"."enquete_reponses_financement" (id) ON DELETE no action ON UPDATE no action;

ALTER TABLE "public"."enquete_reponses" ADD COLUMN "enquete_reponses_prepose_personel_formation_id" int4;
ALTER TABLE "public"."enquete_reponses" ALTER COLUMN "enquete_reponses_prepose_personel_formation_id" DROP NOT NULL;
ALTER TABLE "public"."enquete_reponses" ADD CONSTRAINT enquete_reponses_enquete_reponses_prepose_personel_formation_id FOREIGN KEY (enquete_reponses_prepose_personel_formation_id) REFERENCES "public"."enquete_reponses_prepose_personel_formation" (id) ON DELETE no action ON UPDATE no action;

ALTER TABLE "public"."enquete_reponses" ADD COLUMN "enquete_reponses_modalites_exercice_id" int4;
ALTER TABLE "public"."enquete_reponses" ALTER COLUMN "enquete_reponses_modalites_exercice_id" DROP NOT NULL;
ALTER TABLE "public"."enquete_reponses" ADD CONSTRAINT enquete_reponses_enquete_reponses_modalite_exercice_id_foreign FOREIGN KEY (enquete_reponses_modalites_exercice_id) REFERENCES "public"."enquete_reponses_modalites_exercice" (id) ON DELETE no action ON UPDATE no action;

ALTER TABLE "public"."enquete_reponses" ADD COLUMN "enquete_reponses_populations_id" int4;
ALTER TABLE "public"."enquete_reponses" ALTER COLUMN "enquete_reponses_populations_id" DROP NOT NULL;
ALTER TABLE "public"."enquete_reponses" ADD CONSTRAINT enquete_reponses_enquete_reponses_populations_id_foreign FOREIGN KEY (enquete_reponses_populations_id) REFERENCES "public"."enquete_reponses_populations" (id) ON DELETE no action ON UPDATE no action;

ALTER TABLE "public"."enquete_reponses" ADD COLUMN "enquete_reponses_agrements_formations_id" int4;
ALTER TABLE "public"."enquete_reponses" ALTER COLUMN "enquete_reponses_agrements_formations_id" DROP NOT NULL;
ALTER TABLE "public"."enquete_reponses" ADD CONSTRAINT enquete_reponses_enquete_reponses_agrements_formations_id_forei FOREIGN KEY (enquete_reponses_agrements_formations_id) REFERENCES "public"."enquete_reponses_agrements_formations" (id) ON DELETE no action ON UPDATE no action;

ALTER TABLE "public"."enquete_reponses" ADD COLUMN "enquete_reponses_prestations_sociale_id" int4;
ALTER TABLE "public"."enquete_reponses" ALTER COLUMN "enquete_reponses_prestations_sociale_id" DROP NOT NULL;
ALTER TABLE "public"."enquete_reponses" ADD CONSTRAINT enquete_reponses_enquete_reponses_prestations_sociale_id_foreig FOREIGN KEY (enquete_reponses_prestations_sociale_id) REFERENCES "public"."enquete_reponses_prestations_sociales" (id) ON DELETE no action ON UPDATE no action;

ALTER TABLE "public"."enquete_reponses" ADD COLUMN "enquete_reponses_informations_mandataire_id" int4;
ALTER TABLE "public"."enquete_reponses" ALTER COLUMN "enquete_reponses_informations_mandataire_id" DROP NOT NULL;
ALTER TABLE "public"."enquete_reponses" ADD CONSTRAINT enquete_reponses_enquete_reponses_informations_mandataire_id_fo FOREIGN KEY (enquete_reponses_informations_mandataire_id) REFERENCES "public"."enquete_reponses_informations_mandataire" (id) ON DELETE no action ON UPDATE no action;

alter table "public"."enquete_reponses_service_personnel_formation" drop constraint "enquete_reponses_service_personnel_formation_enquete_reponse";

ALTER TABLE "public"."enquete_reponses_service_personnel_formation" DROP COLUMN "enquete_reponses_id";

alter table "public"."enquete_reponses_service_informations" drop constraint "enquete_reponses_service_informations_enquete_reponses_id_fk";

ALTER TABLE "public"."enquete_reponses_service_informations" DROP COLUMN "enquete_reponses_id";

alter table "public"."enquete_reponses_prestations_sociales" drop constraint "enquete_reponses_prestations_sociales_enquete_reponses_id_fk";

ALTER TABLE "public"."enquete_reponses_prestations_sociales" DROP COLUMN "enquete_reponses_id";

alter table "public"."enquete_reponses_prepose_prestations_sociales" drop constraint "enquete_reponses_prepose_prestations_sociales_enquete_repons";

ALTER TABLE "public"."enquete_reponses_prepose_prestations_sociales" DROP COLUMN "enquete_reponses_id";

alter table "public"."enquete_reponses_prepose_personel_formation" drop constraint "enquete_reponses_prepose_personel_formation_enquete_reponses";

ALTER TABLE "public"."enquete_reponses_prepose_personel_formation" DROP COLUMN "enquete_reponses_id";

alter table "public"."enquete_reponses_populations" drop constraint "enquete_reponses_populations_enquete_reponses_id_fkey";

ALTER TABLE "public"."enquete_reponses_populations" DROP COLUMN "enquete_reponses_id";

alter table "public"."enquete_reponses_modalites_exercice" drop constraint "enquete_reponses_modalites_exercice_enquete_reponses_id_fkey";

ALTER TABLE "public"."enquete_reponses_modalites_exercice" DROP COLUMN "enquete_reponses_id";

alter table "public"."enquete_reponses_informations_mandataire" drop constraint "enquete_reponses_informations_mandataire_enquete_reponses_id";

ALTER TABLE "public"."enquete_reponses_informations_mandataire" DROP COLUMN "enquete_reponses_id";

alter table "public"."enquete_reponses_financement" drop constraint "enquete_reponses_financement_enquete_reponses_id_fkey";

ALTER TABLE "public"."enquete_reponses_financement" DROP COLUMN "enquete_reponses_id";

alter table "public"."enquete_reponses_agrements_formations" drop constraint "enquete_reponses_agrements_formations_enquete_reponses_id_fk";

ALTER TABLE "public"."enquete_reponses_agrements_formations" DROP COLUMN "enquete_reponses_id";

alter table "public"."enquete_reponses_activite" drop constraint "enquete_reponses_activite_enquete_reponses_id_fkey";

ALTER TABLE "public"."enquete_reponses_activite" ALTER COLUMN "enquete_reponses_id" DROP NOT NULL;

ALTER TABLE "public"."enquete_reponses_activite" DROP COLUMN "enquete_reponses_id";
