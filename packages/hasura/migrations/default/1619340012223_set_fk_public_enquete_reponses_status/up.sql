alter table "public"."enquete_reponses"
           add constraint "enquete_reponses_status_fkey"
           foreign key ("status")
           references "public"."enquete_reponse_status"
           ("value") on update restrict on delete restrict;
