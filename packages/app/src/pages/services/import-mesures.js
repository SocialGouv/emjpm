import { LayoutServices } from "~/containers/Layout";
import { ServiceMesureImport } from "~/containers/ServiceMesureImport";
import useUser from "~/hooks/useUser";
import { BoxWrapper } from "~/components/Grid";

function ServiceMesuresImport() {
  const { service_members } = useUser();
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
