alter table "public"."info_finance_annee"
           add constraint "info_finance_annee_type_fkey"
           foreign key ("type")
           references "public"."info_finance_type"
           ("value") on update restrict on delete restrict;
