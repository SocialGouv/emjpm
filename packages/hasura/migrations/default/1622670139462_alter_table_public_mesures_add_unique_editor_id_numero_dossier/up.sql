alter table "public"."mesures" add constraint "mesures_editor_id_numero_dossier_key" unique ("editor_id", "numero_dossier");
