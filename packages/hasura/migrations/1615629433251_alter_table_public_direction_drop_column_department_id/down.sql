ALTER TABLE "public"."direction" ADD COLUMN "department_id" int4;
ALTER TABLE "public"."direction" ALTER COLUMN "department_id" DROP NOT NULL;
