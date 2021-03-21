alter table "public"."enquete_reponses_service_personnel_formation"
           add constraint "enquete_reponses_service_personnel_formation_enquete_reponse"
           foreign key ("enquete_reponses_id")
           references "public"."enquete_reponses"
           ("id") on update cascade on delete cascade;
