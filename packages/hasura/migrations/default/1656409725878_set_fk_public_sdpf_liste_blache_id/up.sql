alter table "public"."sdpf" drop constraint "sdpf_liste_blache_id_fkey",
  add constraint "sdpf_liste_blache_id_fkey"
  foreign key ("liste_blache_id")
  references "public"."liste_blanche"
  ("id") on update cascade on delete cascade;
