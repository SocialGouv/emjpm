import { Flex } from "rebass";

import { LayoutServices } from "~/containers/Layout";
import { MesureAccept } from "~/containers/MesureAccept";
import { MesureProvider } from "~/containers/MesureContext";
import { ServiceMesureSidebar } from "~/containers/ServiceMesureSidebar";
import { BoxWrapper } from "~/components/Grid";

import { useParams } from "react-router-dom";

function AcceptMesurePage() {
  const { mesure_id: mesureId } = useParams();
  return (
    <MesureProvider mesureId={mesureId}>
      <LayoutServices>
        <BoxWrapper mt={1}>
          <Flex flexDirection="column">
            <ServiceMesureSidebar mesureId={mesureId} />
            <MesureAccept />
          </Flex>
        </BoxWrapper>
      </LayoutServices>
    </MesureProvider>
  );
}

export default AcceptMesurePage;
