import { useContext } from "react";

import { LayoutServices } from "~/containers/Layout";
import { ServiceMesureImport } from "~/containers/ServiceMesureImport";
import { UserContext } from "~/containers/UserContext";
import { BoxWrapper } from "~/components/Grid";

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
