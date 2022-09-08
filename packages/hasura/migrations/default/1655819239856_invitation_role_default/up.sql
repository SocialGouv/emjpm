UPDATE service_member_invitations
SET invitation_role = 'service'
WHERE invitation_role IS NULL;
