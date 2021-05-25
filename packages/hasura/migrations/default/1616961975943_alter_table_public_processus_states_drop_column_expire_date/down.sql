ALTER TABLE "public"."processus_states" ADD COLUMN "expire_date" timestamptz;
ALTER TABLE "public"."processus_states" ALTER COLUMN "expire_date" DROP NOT NULL;
