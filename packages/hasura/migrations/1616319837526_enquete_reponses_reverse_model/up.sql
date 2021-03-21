
ALTER TABLE "public"."enquete_reponses_activite" ADD COLUMN "enquete_reponses_id" integer NULL;

ALTER TABLE "public"."enquete_reponses_activite" ALTER COLUMN "enquete_reponses_id" SET NOT NULL;

alter table "public"."enquete_reponses_activite"
           add constraint "enquete_reponses_activite_enquete_reponses_id_fkey"
           foreign key ("enquete_reponses_id")
           references "public"."enquete_reponses"
           ("id") on update cascade on delete cascade;

ALTER TABLE "public"."enquete_reponses_agrements_formations" ADD COLUMN "enquete_reponses_id" integer NOT NULL;

alter table "public"."enquete_reponses_agrements_formations"
           add constraint "enquete_reponses_agrements_formations_enquete_reponses_id_fk"
           foreign key ("enquete_reponses_id")
           references "public"."enquete_reponses"
           ("id") on update cascade on delete cascade;

ALTER TABLE "public"."enquete_reponses_financement" ADD COLUMN "enquete_reponses_id" integer NOT NULL;

alter table "public"."enquete_reponses_financement"
           add constraint "enquete_reponses_financement_enquete_reponses_id_fkey"
           foreign key ("enquete_reponses_id")
           references "public"."enquete_reponses"
           ("id") on update cascade on delete cascade;

ALTER TABLE "public"."enquete_reponses_informations_mandataire" ADD COLUMN "enquete_reponses_id" integer NOT NULL;

alter table "public"."enquete_reponses_informations_mandataire"
           add constraint "enquete_reponses_informations_mandataire_enquete_reponses_id"
           foreign key ("enquete_reponses_id")
           references "public"."enquete_reponses"
           ("id") on update cascade on delete cascade;

ALTER TABLE "public"."enquete_reponses_modalites_exercice" ADD COLUMN "enquete_reponses_id" integer NOT NULL;

alter table "public"."enquete_reponses_modalites_exercice"
           add constraint "enquete_reponses_modalites_exercice_enquete_reponses_id_fkey"
           foreign key ("enquete_reponses_id")
           references "public"."enquete_reponses"
           ("id") on update cascade on delete restrict;

ALTER TABLE "public"."enquete_reponses_populations" ADD COLUMN "enquete_reponses_id" integer NOT NULL;

alter table "public"."enquete_reponses_populations"
           add constraint "enquete_reponses_populations_enquete_reponses_id_fkey"
           foreign key ("enquete_reponses_id")
           references "public"."enquete_reponses"
           ("id") on update cascade on delete cascade;

ALTER TABLE "public"."enquete_reponses_prepose_personel_formation" ADD COLUMN "enquete_reponses_id" integer NOT NULL;

alter table "public"."enquete_reponses_prepose_personel_formation"
           add constraint "enquete_reponses_prepose_personel_formation_enquete_reponses"
           foreign key ("enquete_reponses_id")
           references "public"."enquete_reponses"
           ("id") on update cascade on delete cascade;

ALTER TABLE "public"."enquete_reponses_prepose_prestations_sociales" ADD COLUMN "enquete_reponses_id" integer NOT NULL;

alter table "public"."enquete_reponses_prepose_prestations_sociales"
           add constraint "enquete_reponses_prepose_prestations_sociales_enquete_repons"
           foreign key ("enquete_reponses_id")
           references "public"."enquete_reponses"
           ("id") on update cascade on delete cascade;

ALTER TABLE "public"."enquete_reponses_prestations_sociales" ADD COLUMN "enquete_reponses_id" integer NOT NULL;

alter table "public"."enquete_reponses_prestations_sociales"
           add constraint "enquete_reponses_prestations_sociales_enquete_reponses_id_fk"
           foreign key ("enquete_reponses_id")
           references "public"."enquete_reponses"
           ("id") on update cascade on delete cascade;

ALTER TABLE "public"."enquete_reponses_service_informations" ADD COLUMN "enquete_reponses_id" integer NOT NULL;

alter table "public"."enquete_reponses_service_informations"
           add constraint "enquete_reponses_service_informations_enquete_reponses_id_fk"
           foreign key ("enquete_reponses_id")
           references "public"."enquete_reponses"
           ("id") on update cascade on delete cascade;

ALTER TABLE "public"."enquete_reponses_service_personnel_formation" ADD COLUMN "enquete_reponses_id" integer NOT NULL;

alter table "public"."enquete_reponses_service_personnel_formation"
           add constraint "enquete_reponses_service_personnel_formation_enquete_reponse"
           foreign key ("enquete_reponses_id")
           references "public"."enquete_reponses"
           ("id") on update cascade on delete cascade;

ALTER TABLE "public"."enquete_reponses" DROP COLUMN "enquete_reponses_informations_mandataire_id" CASCADE;

ALTER TABLE "public"."enquete_reponses" DROP COLUMN "enquete_reponses_prestations_sociale_id" CASCADE;

ALTER TABLE "public"."enquete_reponses" DROP COLUMN "enquete_reponses_agrements_formations_id" CASCADE;

ALTER TABLE "public"."enquete_reponses" DROP COLUMN "enquete_reponses_populations_id" CASCADE;

ALTER TABLE "public"."enquete_reponses" DROP COLUMN "enquete_reponses_modalites_exercice_id" CASCADE;

ALTER TABLE "public"."enquete_reponses" DROP COLUMN "enquete_reponses_prepose_personel_formation_id" CASCADE;

ALTER TABLE "public"."enquete_reponses" DROP COLUMN "enquete_reponses_financement_id" CASCADE;

ALTER TABLE "public"."enquete_reponses" DROP COLUMN "enquete_reponses_prepose_prestations_sociales_id" CASCADE;

ALTER TABLE "public"."enquete_reponses" DROP COLUMN "enquete_reponses_activite_id" CASCADE;

ALTER TABLE "public"."enquete_reponses" DROP COLUMN "enquete_reponses_service_personnel_formation_id" CASCADE;

ALTER TABLE "public"."enquete_reponses" DROP COLUMN "enquete_reponses_service_informations_id" CASCADE;

ALTER TABLE "public"."enquete_reponses_activite" ADD CONSTRAINT "enquete_reponses_activite_enquete_reponses_id_key" UNIQUE ("enquete_reponses_id");

ALTER TABLE "public"."enquete_reponses_agrements_formations" ADD CONSTRAINT "enquete_reponses_agrements_formations_enquete_reponses_id_key" UNIQUE ("enquete_reponses_id");

ALTER TABLE "public"."enquete_reponses_financement" ADD CONSTRAINT "enquete_reponses_financement_enquete_reponses_id_key" UNIQUE ("enquete_reponses_id");

ALTER TABLE "public"."enquete_reponses_informations_mandataire" ADD CONSTRAINT "enquete_reponses_informations_mandataire_enquete_reponses_id_key" UNIQUE ("enquete_reponses_id");

ALTER TABLE "public"."enquete_reponses_modalites_exercice" ADD CONSTRAINT "enquete_reponses_modalites_exercice_enquete_reponses_id_key" UNIQUE ("enquete_reponses_id");

ALTER TABLE "public"."enquete_reponses_populations" ADD CONSTRAINT "enquete_reponses_populations_enquete_reponses_id_key" UNIQUE ("enquete_reponses_id");

ALTER TABLE "public"."enquete_reponses_prepose_personel_formation" ADD CONSTRAINT "enquete_reponses_prepose_personel_formation_enquete_reponses_id_key" UNIQUE ("enquete_reponses_id");

ALTER TABLE "public"."enquete_reponses_prepose_prestations_sociales" ADD CONSTRAINT "enquete_reponses_prepose_prestations_sociales_enquete_reponses_id_key" UNIQUE ("enquete_reponses_id");

ALTER TABLE "public"."enquete_reponses_prestations_sociales" ADD CONSTRAINT "enquete_reponses_prestations_sociales_enquete_reponses_id_key" UNIQUE ("enquete_reponses_id");

ALTER TABLE "public"."enquete_reponses_service_informations" ADD CONSTRAINT "enquete_reponses_service_informations_enquete_reponses_id_key" UNIQUE ("enquete_reponses_id");

ALTER TABLE "public"."enquete_reponses_service_personnel_formation" ADD CONSTRAINT "enquete_reponses_service_personnel_formation_enquete_reponses_id_key" UNIQUE ("enquete_reponses_id");

alter table "public"."enquete_reponses" add constraint "enquete_reponses_enquete_id_mandataire_id_key" unique ("enquete_id", "mandataire_id");

alter table "public"."enquete_reponses" add constraint "enquete_reponses_enquete_id_service_id_key" unique ("enquete_id", "service_id");

ALTER TABLE "public"."enquete_reponses_activite" ALTER COLUMN "enquete_reponses_id" DROP NOT NULL;

ALTER TABLE "public"."enquete_reponses_agrements_formations" ALTER COLUMN "enquete_reponses_id" DROP NOT NULL;

ALTER TABLE "public"."enquete_reponses_financement" ALTER COLUMN "enquete_reponses_id" DROP NOT NULL;

ALTER TABLE "public"."enquete_reponses_informations_mandataire" ALTER COLUMN "enquete_reponses_id" TYPE integer;
ALTER TABLE "public"."enquete_reponses_informations_mandataire" ALTER COLUMN "enquete_reponses_id" DROP NOT NULL;

ALTER TABLE "public"."enquete_reponses_modalites_exercice" ALTER COLUMN "enquete_reponses_id" DROP NOT NULL;

ALTER TABLE "public"."enquete_reponses_populations" ALTER COLUMN "enquete_reponses_id" DROP NOT NULL;

ALTER TABLE "public"."enquete_reponses_prepose_personel_formation" ALTER COLUMN "enquete_reponses_id" DROP NOT NULL;

ALTER TABLE "public"."enquete_reponses_prepose_prestations_sociales" ALTER COLUMN "enquete_reponses_id" DROP NOT NULL;

ALTER TABLE "public"."enquete_reponses_prestations_sociales" ALTER COLUMN "enquete_reponses_id" DROP NOT NULL;

ALTER TABLE "public"."enquete_reponses_service_informations" ALTER COLUMN "enquete_reponses_id" DROP NOT NULL;

ALTER TABLE "public"."enquete_reponses_service_personnel_formation" ALTER COLUMN "enquete_reponses_id" DROP NOT NULL;

ALTER TABLE "public"."enquete_reponses" DROP COLUMN "departement_id" CASCADE;
