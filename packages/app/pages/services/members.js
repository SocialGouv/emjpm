import { BoxWrapper } from "@socialgouv/emjpm-ui-core";
import React, { useContext } from "react";

import { LayoutServices } from "../../src/components/Layout";
import { ServiceMemberInvitations } from "../../src/components/ServiceMemberInvitations";
import { ServiceMembers } from "../../src/components/ServiceMembers";
import { UserContext } from "../../src/components/UserContext";
import { withAuthSync } from "../../src/util/auth";

const ServiceMembersPage = () => {
  const { service_members } = useContext(UserContext);
  const [{ is_admin, service }] = service_members;

  return (
    <LayoutServices>
      <BoxWrapper mt={6} px={2}>
        <ServiceMemberInvitations service={service} isAdmin={is_admin} />
        <ServiceMembers service={service} isAdmin={is_admin} />
      </BoxWrapper>
    </LayoutServices>
  );
};

export default withAuthSync(ServiceMembersPage);
