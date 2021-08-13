alter table "public"."mesures" add constraint "mesures_numero_rg_ti_id_mandataire_id_key" unique ("numero_rg", "ti_id", "mandataire_id");
