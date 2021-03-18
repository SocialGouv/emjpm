alter table "public"."enquete_reponses_prepose_prestations_sociales"
           add constraint "enquete_reponses_prepose_prestations_sociales_enquete_repons"
           foreign key ("enquete_reponses_id")
           references "public"."enquete_reponses"
           ("id") on update cascade on delete cascade;
