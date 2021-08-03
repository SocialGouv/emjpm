alter table "public"."mesures" add constraint "mesures_mandataire_id_numero_rg_ti_id_key" unique ("mandataire_id", "numero_rg", "ti_id");
