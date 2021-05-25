alter table "public"."direction" add constraint "direction_user_id_type_key" unique ("user_id", "type");
