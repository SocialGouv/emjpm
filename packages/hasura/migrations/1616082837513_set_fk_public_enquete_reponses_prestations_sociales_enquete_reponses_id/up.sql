alter table "public"."enquete_reponses_prestations_sociales"
           add constraint "enquete_reponses_prestations_sociales_enquete_reponses_id_fk"
           foreign key ("enquete_reponses_id")
           references "public"."enquete_reponses"
           ("id") on update cascade on delete cascade;
