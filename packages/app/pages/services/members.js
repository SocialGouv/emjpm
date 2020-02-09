import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

import { LayoutServices } from "../../src/components/Layout";
import { ServiceMembers } from "../../src/components/ServiceMembers";
import { UserContext } from "../../src/components/UserContext";
import { withAuthSync } from "../../src/util/auth";

const ServiceMembersPage = () => {
  const user = useContext(UserContext);
  const router = useRouter();

  const { service_members } = user;
  const [{ is_admin, service }] = service_members;

  useEffect(() => {
    if (!is_admin) {
      router.push("/services");
    }
  }, [is_admin, router]);

  if (!is_admin) {
    return null;
  }

  return (
    <LayoutServices isAdmin={is_admin}>
      <ServiceMembers service={service} members={service_members} />
    </LayoutServices>
  );
};

export default withAuthSync(ServiceMembersPage);
