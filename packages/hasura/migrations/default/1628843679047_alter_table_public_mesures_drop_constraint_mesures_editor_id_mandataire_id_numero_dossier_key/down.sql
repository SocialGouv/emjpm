alter table "public"."mesures" add constraint "mesures_numero_dossier_editor_id_mandataire_id_key" unique ("numero_dossier", "editor_id", "mandataire_id");
