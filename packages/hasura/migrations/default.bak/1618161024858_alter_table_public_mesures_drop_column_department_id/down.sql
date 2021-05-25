ALTER TABLE "public"."mesures" ADD COLUMN "department_id" int4;
ALTER TABLE "public"."mesures" ALTER COLUMN "department_id" DROP NOT NULL;
