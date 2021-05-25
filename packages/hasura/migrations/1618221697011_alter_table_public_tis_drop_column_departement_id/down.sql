ALTER TABLE "public"."tis" ADD COLUMN "departement_id" int4;
ALTER TABLE "public"."tis" ALTER COLUMN "departement_id" DROP NOT NULL;
