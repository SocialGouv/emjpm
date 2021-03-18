alter table "public"."enquete_reponses_informations_mandataire"
           add constraint "enquete_reponses_informations_mandataire_enquete_reponses_id"
           foreign key ("enquete_reponses_id")
           references "public"."enquete_reponses"
           ("id") on update cascade on delete cascade;
