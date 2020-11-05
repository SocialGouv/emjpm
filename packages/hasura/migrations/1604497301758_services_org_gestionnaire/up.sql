
ALTER TABLE "public"."services" ADD COLUMN "org_gestionnaire" boolean NULL;

ALTER TABLE "public"."services" ADD COLUMN "org_nom" varchar NULL;

ALTER TABLE "public"."services" ADD COLUMN "org_adresse" varchar NULL;

ALTER TABLE "public"."services" ADD COLUMN "org_code_postal" varchar NULL;

ALTER TABLE "public"."services" ADD COLUMN "org_ville" varchar NULL;
