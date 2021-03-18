alter table "public"."enquete_reponses_prepose_personel_formation"
           add constraint "enquete_reponses_prepose_personel_formation_enquete_reponses"
           foreign key ("enquete_reponses_id")
           references "public"."enquete_reponses"
           ("id") on update cascade on delete cascade;
