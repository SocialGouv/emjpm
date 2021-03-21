ALTER TABLE "public"."enquete_reponses" ADD COLUMN "enquete_reponses_modalites_exercice_id" int4;
ALTER TABLE "public"."enquete_reponses" ALTER COLUMN "enquete_reponses_modalites_exercice_id" DROP NOT NULL;
ALTER TABLE "public"."enquete_reponses" ADD CONSTRAINT enquete_reponses_enquete_reponses_modalite_exercice_id_foreign FOREIGN KEY (enquete_reponses_modalites_exercice_id) REFERENCES "public"."enquete_reponses_modalites_exercice" (id) ON DELETE no action ON UPDATE no action;
