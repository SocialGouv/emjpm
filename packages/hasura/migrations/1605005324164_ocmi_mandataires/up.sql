
CREATE TABLE "public"."ocmi_mandataires"("id" integer NOT NULL, "nom" varchar NOT NULL, "prenom" varchar NOT NULL, "email" varchar NOT NULL, "siret" varchar NOT NULL, "adresse1" varchar NOT NULL, "adresse2" varchar, "code_postal" varchar NOT NULL, "ville" varchar NOT NULL, "mesures" jsonb NOT NULL DEFAULT jsonb_build_array(), "departement_financeur" varchar NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"), UNIQUE ("siret"));

alter table "public"."ocmi_mandataires" drop constraint "ocmi_mandataires_pkey";
alter table "public"."ocmi_mandataires"
    add constraint "ocmi_mandataires_pkey" 
    primary key ( "siret" );

ALTER TABLE "public"."ocmi_mandataires" DROP COLUMN "id" CASCADE;
