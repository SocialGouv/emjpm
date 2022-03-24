import { Flex } from "rebass";

import { LayoutServices } from "~/containers/Layout";
import { MesureProvider } from "~/containers/MesureContext";
import { MesureReactivate } from "~/containers/MesureReactivate";
import { ServiceMesureSidebar } from "~/containers/ServiceMesureSidebar";
import { BoxWrapper } from "~/components/Grid";

import { SkipToContent } from "~/components";

import { useParams } from "react-router-dom";

function ReactivateMesurePage() {
  const { mesure_id } = useParams();
  const mesureId = parseInt(mesure_id);

  return (
    <>
      <SkipToContent skipTo="mesure_reactivate" />
      <MesureProvider mesureId={mesureId}>
        <LayoutServices>
          <BoxWrapper mt={1} id="mesure_reactivate">
            <Flex flexDirection="column">
              <ServiceMesureSidebar mesureId={mesureId} />
              <MesureReactivate />
            </Flex>
          </BoxWrapper>
        </LayoutServices>
      </MesureProvider>
    </>
  );
}

export default ReactivateMesurePage;
