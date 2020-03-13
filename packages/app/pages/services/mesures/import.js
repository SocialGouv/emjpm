import { BoxWrapper } from "@socialgouv/emjpm-ui-core";
import React, { useContext } from "react";

import { LayoutServices } from "../../../src/components/Layout";
import { ServiceMesureImport } from "../../../src/components/ServiceMesureImport";
import { UserContext } from "../../../src/components/UserContext";
import { withAuthSync } from "../../../src/util/auth";

const ServiceMesuresImport = () => {
  const { service_members } = useContext(UserContext);
  const [{ id }] = service_members;

  return (
    <LayoutServices>
      <BoxWrapper my={6} px={1}>
        <ServiceMesureImport serviceId={id} />
      </BoxWrapper>
    </LayoutServices>
  );
};

export default withAuthSync(ServiceMesuresImport);
