import { useContext } from "react";

import { LayoutServices } from "~/components/Layout";
import { ServiceMesureImport } from "~/components/ServiceMesureImport";
import { UserContext } from "~/components/UserContext";
import { BoxWrapper } from "~/ui";

function ServiceMesuresImport() {
  const { service_members } = useContext(UserContext);
  const [{ service_id }] = service_members;

  return (
    <LayoutServices>
      <BoxWrapper my={6} px={1}>
        <ServiceMesureImport serviceId={service_id} />
      </BoxWrapper>
    </LayoutServices>
  );
}

export default ServiceMesuresImport;
