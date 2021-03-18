alter table "public"."enquete_reponses_populations"
           add constraint "enquete_reponses_populations_enquete_reponses_id_fkey"
           foreign key ("enquete_reponses_id")
           references "public"."enquete_reponses"
           ("id") on update cascade on delete cascade;
