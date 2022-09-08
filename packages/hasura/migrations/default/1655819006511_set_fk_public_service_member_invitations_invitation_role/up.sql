alter table "public"."service_member_invitations"
  add constraint "service_member_invitations_invitation_role_fkey"
  foreign key ("invitation_role")
  references "public"."service_invitation_role"
  ("value") on update restrict on delete restrict;
