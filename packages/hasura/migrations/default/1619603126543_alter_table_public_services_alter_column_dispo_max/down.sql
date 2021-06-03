ALTER TABLE ONLY "public"."services" ALTER COLUMN "dispo_max" DROP DEFAULT;
ALTER TABLE "public"."services" ALTER COLUMN "dispo_max" DROP NOT NULL;
