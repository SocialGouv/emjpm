import React, { useContext } from "react";

import { LayoutServices } from "../../src/components/Layout";
import { ServiceMembers } from "../../src/components/ServiceMembers";
import { UserContext } from "../../src/components/UserContext";
import { withAuthSync } from "../../src/util/auth";

const Members = () => {
  const { service_members } = useContext(UserContext);
  const [{ service }] = service_members;

  return (
    <LayoutServices>
      <ServiceMembers service={service} members={service_members} />
    </LayoutServices>
  );
};

export default withAuthSync(Members);
