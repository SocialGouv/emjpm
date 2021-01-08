import { useContext } from "react";

import { LayoutServices } from "~/components/Layout";
import { ServiceMemberInvitationCreate } from "~/components/ServiceMemberInvitationCreate";
import { ServiceMemberInvitations } from "~/components/ServiceMemberInvitations";
import { ServiceMembers } from "~/components/ServiceMembers";
import { UserContext } from "~/components/UserContext";
import { BoxWrapper } from "~/ui";

const ServiceMembersPage = () => {
  const { service_members, id } = useContext(UserContext);
  const [{ is_admin, service }] = service_members;
  return (
    <LayoutServices>
      <BoxWrapper mt={6} px={2}>
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
};

export default ServiceMembersPage;
