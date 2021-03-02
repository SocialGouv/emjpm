ALTER TABLE "public"."processus_states" ADD COLUMN "id" varchar;
ALTER TABLE "public"."processus_states" ALTER COLUMN "id" DROP NOT NULL;
