alter table "public"."service_member_invitations" alter column "invitation_role" drop not null;
ALTER TABLE "public"."service_member_invitations" ALTER COLUMN "invitation_role" drop default;
