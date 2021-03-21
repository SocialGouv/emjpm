ALTER TABLE "public"."enquete_reponses" ADD COLUMN "departement_id" int4;
ALTER TABLE "public"."enquete_reponses" ALTER COLUMN "departement_id" DROP NOT NULL;
