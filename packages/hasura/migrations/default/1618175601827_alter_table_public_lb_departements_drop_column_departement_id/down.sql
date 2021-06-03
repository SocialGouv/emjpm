ALTER TABLE "public"."lb_departements" ADD COLUMN "departement_id" int4;
ALTER TABLE "public"."lb_departements" ALTER COLUMN "departement_id" DROP NOT NULL;
