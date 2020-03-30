import { BoxWrapper } from "@emjpm/ui";
import React, { useContext } from "react";

import { LayoutServices } from "../../src/components/Layout";
import { ServiceMemberInvitationCreate } from "../../src/components/ServiceMemberInvitationCreate";
import { ServiceMemberInvitations } from "../../src/components/ServiceMemberInvitations";
import { ServiceMembers } from "../../src/components/ServiceMembers";
import { UserContext } from "../../src/components/UserContext";
import { withAuthSync } from "../../src/util/auth";

const ServiceMembersPage = () => {
  const { service_members, id } = useContext(UserContext);
  const [{ is_admin, service }] = service_members;
  return (
    <LayoutServices>
      <BoxWrapper mt={6} px={2}>
        <ServiceMembers service={service} userId={id} isAdmin={is_admin} />
        {is_admin && <ServiceMemberInvitations service={service} isAdmin={is_admin} />}
        {is_admin && <ServiceMemberInvitationCreate service={service} isAdmin={is_admin} />}
      </BoxWrapper>
    </LayoutServices>
  );
};

export default withAuthSync(ServiceMembersPage);
