alter table "public"."mesures" drop constraint "mesures_editor_id_numero_dossier_key";
alter table "public"."mesures" add constraint "mesures_editor_id_mandataire_id_numero_dossier_key" unique ("editor_id", "mandataire_id", "numero_dossier");
