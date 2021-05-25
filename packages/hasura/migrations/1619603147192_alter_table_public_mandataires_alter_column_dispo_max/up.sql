ALTER TABLE ONLY "public"."mandataires" ALTER COLUMN "dispo_max" SET DEFAULT 0;
ALTER TABLE "public"."mandataires" ALTER COLUMN "dispo_max" SET NOT NULL;
