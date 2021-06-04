alter table "public"."mesures" add constraint "mesures_editor_id_service_id_numero_dossier_key" unique ("editor_id", "service_id", "numero_dossier");
