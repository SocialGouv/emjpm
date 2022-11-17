alter table "public"."sdpf"
  add constraint "sdpf_liste_blache_id_fkey"
  foreign key ("liste_blache_id")
  references "public"."liste_blanche"
  ("id") on update restrict on delete restrict;
