ALTER TABLE ONLY "public"."mandataires" ALTER COLUMN "dispo_max" DROP DEFAULT;
ALTER TABLE "public"."mandataires" ALTER COLUMN "dispo_max" DROP NOT NULL;
