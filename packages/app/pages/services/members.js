import React, { useContext } from "react";

import { LayoutServices } from "../../src/components/Layout";
import { ServiceMembers } from "../../src/components/ServiceMembers";
import { UserContext } from "../../src/components/UserContext";
import { withAuthSync } from "../../src/util/auth";

const ServiceMembersPage = () => {
  const { service_members } = useContext(UserContext);
  const [{ is_admin, service }] = service_members;

  return (
    <LayoutServices>
      <ServiceMembers service={service} isAdmin={is_admin} />
    </LayoutServices>
  );
};

export default withAuthSync(ServiceMembersPage);
