ALTER TABLE "public"."services" ADD COLUMN "department_id" int4;
ALTER TABLE "public"."services" ALTER COLUMN "department_id" DROP NOT NULL;
