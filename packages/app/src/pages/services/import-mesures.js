import { BoxWrapper } from "@emjpm/ui";
import React, { useContext } from "react";

import { LayoutServices } from "~/components/Layout";
import { ServiceMesureImport } from "~/components/ServiceMesureImport";
import { UserContext } from "~/components/UserContext";
import { withAuthSync } from "~/util/auth";

const ServiceMesuresImport = () => {
  const { service_members } = useContext(UserContext);
  const [{ service_id }] = service_members;

  return (
    <LayoutServices>
      <BoxWrapper my={6} px={1}>
        <ServiceMesureImport serviceId={service_id} />
      </BoxWrapper>
    </LayoutServices>
  );
};

export default withAuthSync(ServiceMesuresImport);
