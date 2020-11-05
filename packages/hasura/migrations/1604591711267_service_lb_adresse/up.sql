
ALTER TABLE "public"."services" ADD COLUMN "lb_adresse" varchar NULL;

ALTER TABLE "public"."services" ADD COLUMN "lb_code_postal" varchar NULL;

ALTER TABLE "public"."services" ADD COLUMN "lb_ville" varchar NULL;

UPDATE "public"."services" SET "lb_adresse" = "adresse";

UPDATE "public"."services" SET "lb_code_postal" = "code_postal";

UPDATE "public"."services" SET "lb_ville" = "ville";
