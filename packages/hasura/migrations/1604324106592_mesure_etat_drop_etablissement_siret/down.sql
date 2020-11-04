ALTER TABLE "public"."mesure_etat" ADD COLUMN "etablissement_siret" varchar;
ALTER TABLE "public"."mesure_etat" ALTER COLUMN "etablissement_siret" DROP NOT NULL;
