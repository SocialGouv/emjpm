ALTER TABLE "public"."mandataires" ADD COLUMN "department_id" int4;
ALTER TABLE "public"."mandataires" ALTER COLUMN "department_id" DROP NOT NULL;
