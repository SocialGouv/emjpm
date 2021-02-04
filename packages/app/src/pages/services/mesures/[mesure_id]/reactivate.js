import { Flex } from "rebass";

import { LayoutServices } from "~/containers/Layout";
import { MesureProvider } from "~/containers/MesureContext";
import { MesureReactivate } from "~/containers/MesureReactivate";
import { ServiceMesureSidebar } from "~/containers/ServiceMesureSidebar";
import { BoxWrapper } from "~/components/Grid";

import { useParams } from "react-router-dom";

function ReactivateMesurePage() {
  const { mesure_id: mesureId } = useParams();
  return (
    <MesureProvider mesureId={mesureId}>
      <LayoutServices>
        <BoxWrapper mt={1}>
          <Flex flexDirection="column">
            <ServiceMesureSidebar mesureId={mesureId} />
            <MesureReactivate />
          </Flex>
        </BoxWrapper>
      </LayoutServices>
    </MesureProvider>
  );
}

export default ReactivateMesurePage;
