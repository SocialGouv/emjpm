alter table "public"."lb_update_log"
  add constraint "lb_update_log_lb_user_id_fkey"
  foreign key ("lb_user_id")
  references "public"."lb_users"
  ("id") on update set null on delete set null;
