import { LayoutServices } from "~/containers/Layout";
import { ServiceMesureImport } from "~/containers/ServiceMesureImport";
import useUser from "~/hooks/useUser";
import { BoxWrapper } from "~/components/Grid";
import { Helmet } from "react-helmet";

function ServiceMesuresImport() {
  const { service_members } = useUser();
  const [{ service_id }] = service_members;

  return (
    <>
      <Helmet>
        <title>Importer vos mesures | e-MJPM</title>
      </Helmet>
      <LayoutServices>
        <BoxWrapper my={6} px={1}>
          <ServiceMesureImport serviceId={service_id} />
        </BoxWrapper>
      </LayoutServices>
    </>
  );
}

export default ServiceMesuresImport;
