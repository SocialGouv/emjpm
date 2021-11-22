alter table "public"."mesures" add constraint "mesures_service_id_numero_rg_ti_id_key" unique ("service_id", "numero_rg", "ti_id");
