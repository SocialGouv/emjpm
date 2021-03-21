ALTER TABLE "public"."enquete_reponses" ADD COLUMN "enquete_reponses_service_informations_id" int4;
ALTER TABLE "public"."enquete_reponses" ALTER COLUMN "enquete_reponses_service_informations_id" DROP NOT NULL;
ALTER TABLE "public"."enquete_reponses" ADD CONSTRAINT enquete_reponses_enquete_reponses_service_informations_id_forei FOREIGN KEY (enquete_reponses_service_informations_id) REFERENCES "public"."enquete_reponses_service_informations" (id) ON DELETE no action ON UPDATE no action;
