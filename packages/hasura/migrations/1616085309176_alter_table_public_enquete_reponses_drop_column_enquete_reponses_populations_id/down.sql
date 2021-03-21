ALTER TABLE "public"."enquete_reponses" ADD COLUMN "enquete_reponses_populations_id" int4;
ALTER TABLE "public"."enquete_reponses" ALTER COLUMN "enquete_reponses_populations_id" DROP NOT NULL;
ALTER TABLE "public"."enquete_reponses" ADD CONSTRAINT enquete_reponses_enquete_reponses_populations_id_foreign FOREIGN KEY (enquete_reponses_populations_id) REFERENCES "public"."enquete_reponses_populations" (id) ON DELETE no action ON UPDATE no action;
