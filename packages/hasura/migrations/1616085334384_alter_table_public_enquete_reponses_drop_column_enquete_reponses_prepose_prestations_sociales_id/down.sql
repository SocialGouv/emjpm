ALTER TABLE "public"."enquete_reponses" ADD COLUMN "enquete_reponses_prepose_prestations_sociales_id" int4;
ALTER TABLE "public"."enquete_reponses" ALTER COLUMN "enquete_reponses_prepose_prestations_sociales_id" DROP NOT NULL;
ALTER TABLE "public"."enquete_reponses" ADD CONSTRAINT enquete_reponses_enquete_reponses_prepose_prestations_sociales_ FOREIGN KEY (enquete_reponses_prepose_prestations_sociales_id) REFERENCES "public"."enquete_reponses_prepose_prestations_sociales" (id) ON DELETE no action ON UPDATE no action;
