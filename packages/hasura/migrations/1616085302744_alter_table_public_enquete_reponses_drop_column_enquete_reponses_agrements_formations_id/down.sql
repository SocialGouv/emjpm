ALTER TABLE "public"."enquete_reponses" ADD COLUMN "enquete_reponses_agrements_formations_id" int4;
ALTER TABLE "public"."enquete_reponses" ALTER COLUMN "enquete_reponses_agrements_formations_id" DROP NOT NULL;
ALTER TABLE "public"."enquete_reponses" ADD CONSTRAINT enquete_reponses_enquete_reponses_agrements_formations_id_forei FOREIGN KEY (enquete_reponses_agrements_formations_id) REFERENCES "public"."enquete_reponses_agrements_formations" (id) ON DELETE no action ON UPDATE no action;
