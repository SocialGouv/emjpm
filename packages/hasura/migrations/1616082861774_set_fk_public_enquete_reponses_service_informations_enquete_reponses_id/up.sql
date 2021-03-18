alter table "public"."enquete_reponses_service_informations"
           add constraint "enquete_reponses_service_informations_enquete_reponses_id_fk"
           foreign key ("enquete_reponses_id")
           references "public"."enquete_reponses"
           ("id") on update cascade on delete cascade;
