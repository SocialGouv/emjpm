alter table "public"."lb_update_log"
  add constraint "lb_update_log_service_id_fkey"
  foreign key ("service_id")
  references "public"."services"
  ("id") on update set null on delete set null;
