alter table "public"."service_member_invitations" alter column "invitation_role" set default 'service';
alter table "public"."service_member_invitations" alter column "invitation_role" set not null;
