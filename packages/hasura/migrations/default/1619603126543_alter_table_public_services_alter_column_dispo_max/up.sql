ALTER TABLE ONLY "public"."services" ALTER COLUMN "dispo_max" SET DEFAULT 0;
ALTER TABLE "public"."services" ALTER COLUMN "dispo_max" SET NOT NULL;
