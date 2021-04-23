import { LayoutServices } from "~/containers/Layout";
import { ServiceMemberInvitationCreate } from "~/containers/ServiceMemberInvitationCreate";
import { ServiceMemberInvitations } from "~/containers/ServiceMemberInvitations";
import { ServiceMembers } from "~/containers/ServiceMembers";
import useUser from "~/hooks/useUser";
import { BoxWrapper } from "~/components/Grid";

function ServiceMembersPage() {
  const { service_members, id } = useUser();
  const [{ is_admin, service }] = service_members;
  return (
    <LayoutServices>
      <BoxWrapper mt={3} px={2}>
        <ServiceMembers service={service} userId={id} isAdmin={is_admin} />
        {is_admin && (
          <ServiceMemberInvitations service={service} isAdmin={is_admin} />
        )}
        {is_admin && (
          <ServiceMemberInvitationCreate service={service} isAdmin={is_admin} />
        )}
      </BoxWrapper>
    </LayoutServices>
  );
}

export default ServiceMembersPage;
